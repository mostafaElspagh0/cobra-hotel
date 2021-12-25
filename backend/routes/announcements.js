const express = require("express");
const router = express.Router();
const config = require('config');
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

//-------put
router.put('/:id',
    [
        check('_id', 'ID is required') .notEmpty().optional(),
        check('target_audience', 'Target Audience is required').isIn(['Manager', 'Hr','Receptionist', 'Barista']).optional(),

    ],
    async (req , res ) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            let{ issued_by,target_audience, title, body }=req.body;
            const announcement = await Announcement.findById(req.params.id);
            if(!announcement){
                return res.status(404).json({msg:'announcement Not Found'});
            }
            if(issued_by){
                announcement.issued_by=issued_by;
            }
            if(target_audience){
                announcement.target_audience=target_audience
            }
            if(title){
                announcement.title=title
            }
            if(body){
                announcement.body=body
            }

            await announcement.save();
            const userObj = announcement.toObject() ;
            delete userObj.password;
            res.json({msg:'announcement is updated',announcement:userObj});
        }catch (err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

//-------pagination
router.get("/",
    async (req,res)=>{
        const perPage = req.query.perPage * 1 || config.get('perPage')*1;
        const page = req.query.page * 1 || 0 ;
        let announcements = await Announcement.find().limit(perPage).skip(perPage * page);
        return res.json(announcements);
    });


module.exports= router;



