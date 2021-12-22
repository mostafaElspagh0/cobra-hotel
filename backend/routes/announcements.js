const express = require("express");
const router = express.Router();
const Announcement = require("../services/database/models/announcement");
const {check, validationResult} = require("express-validator");
const {isA} = require("../services/auth/middlelayers/rolesMiddleLayer");
router.use(isA(["Hr","Manger"]));


//-------post
router.post('/',
    [
        check('_id', 'ID is required') .notEmpty(),
        check('target_audience', 'Target Audience is required').isIn(['Manager', 'Hr','Receptionist', 'Barista']).optional(),

    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { issued_by,target_audience, title, body } = req.body;
        const announcement = new Announcement({
            issued_by,
            target_audience,
            title,
            body
        });
        try {
            let announcementExist = await Announcement.findOne({ issued_by });
            if (announcementExist) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'announcement already exists' }] });
            }
            await announcement.save();
            const announcementObj=announcement.toObject();
            delete announcementObj.body;                     /* ????????????????????????????????????? */
            res.json({msg:'announcement created',announcement : announcementObj });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


//-------getById
router.get('/:id' ,
    async (req , res ) => {
        try {
            const  id = req.params.id;
            const announcement =await Announcement.findById(id)
            if(!announcement){
                return res.status(404).json({msg:'announcement not found'})
            }
            const announcementObj = announcement.toObject();
            delete announcementObj.password;
            res.json({announcement:announcementObj});
        }catch (err){
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    });

//-------deleteById
router.delete('/:id',
    async (req , res ) => {
        try {
            const  id = req.params.id;
            const announcement =await Announcement.findById(id)
            if(!announcement){
                return res.status(404).json({msg:'announcement not found'})
            }
            await announcement.remove();
            res.json({msg:'announcement removed'});
        }catch (err){
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    });



module.exports= router;



