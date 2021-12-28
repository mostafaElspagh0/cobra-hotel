const express = require("express");
const router = express.Router();
const config = require('config');
const Announcement = require("../services/database/models/announcement");
const {check, validationResult} = require("express-validator");
const {isA} = require("../services/auth/middlelayers/rolesMiddleLayer");

router.get("/my",
    [
        isA(["All"]),
    ],
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({msg: 'you are not logged in'})
        }
        const filter = {$or: [{target_audience: req.user.job_type}, {target_audience: "All"}]};
        const perPage = req.query.perPage * 1 || config.get('perPage') * 1;
        const page = req.query.page * 1 || 0;
        let announcements = await Announcement.find(filter).limit(perPage).skip(perPage * page);
        let total = await Announcement.countDocuments(filter);
        return res.json({announcements, total});
    });

router.post("/read/:id", [
        isA(["All"]),
    ],
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({msg: 'you are not logged in'})
        }
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({msg: 'announcement not found'})
        }
        if (announcement.target_audience !== req.user.job_type && announcement.target_audience !== "All") {
            return res.status(401).json({msg: 'you are not allowed to read this announcement'})
        }
        if(announcement.read_by.includes(req.user.id)){
            return res.status(400).json({msg: 'you have already read this announcement'})
        }
        announcement.read_by.push(req.user.id);
        await announcement.save();
        return res.json({announcement});
    });

//-------post
router.post('/',
    [
        isA(["Hr", "Manager"]),
        check('target_audience', 'Target Audience is required').isIn(["All", 'Manager', 'Hr', 'Receptionist', 'Barista']).optional(),
        check('title', 'Title is required').not().isEmpty().trim().escape(),
        check('body', 'body is required').not().isEmpty().trim().escape(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const issued_by = req.user.id;
        let {target_audience, title, body} = req.body;
        const announcement = new Announcement({
            issued_by,
            target_audience,
            title,
            body
        });
        try {
            await announcement.save();
            const announcementObj = announcement.toObject();
            res.json({msg: 'announcement created', announcement: announcementObj});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


//-------getById
router.get('/:id',
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        try {
            const id = req.params.id;
            const announcement = await Announcement.findById(id)
            if (!announcement) {
                return res.status(404).json({msg: 'announcement not found'})
            }
            const announcementObj = announcement.toObject();
            delete announcementObj.password;
            res.json({announcement: announcementObj});
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    });

//-------deleteById
router.delete('/:id',
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        try {
            const id = req.params.id;
            const announcement = await Announcement.findById(id)
            if (!announcement) {
                return res.status(404).json({msg: 'announcement not found'})
            }
            await announcement.remove();
            res.json({msg: 'announcement removed'});
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    }
)
;

//-------pagination
router.get("/",
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        const perPage = req.query.perPage * 1 || config.get('perPage') * 1;
        const page = req.query.page * 1 || 0;
        let announcements = await Announcement.find().limit(perPage).skip(perPage * page);
        let total = await Announcement.countDocuments();
        return res.json({announcements, total});
    });


module.exports = router;



