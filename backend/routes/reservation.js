const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {isA} = require('../services/auth/middlelayers/rolesMiddleLayer');
const Reservation = require('../services/database/models/reservation');
const Room = require('../services/database/models/room');
const config = require("config");
const User = require("../services/database/models/user");
router.use(isA(["Manager", "Receptionist"]));


router.post("/",
    [
        check("startDate").isDate(),
        check("endDate").isDate(),
        check("type").isIn(['full', 'b&b', 'half']),
        check("roomId").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        if (!req.user) {
            return res.status(401).json({errors: [{msg: "You are not logged in"}]});
        }
        const {startDate, endDate, type, roomId} = req.body;
        const currentRoom = await Room.findOne({roomId:roomId});
        if (!currentRoom) {
            return res.status(404).json({errors: [{msg: "Room not found"}]});
        }
        // for (let i = 0; i < currentRoom.reservations.length; i++) {
        //     const currentReservation = await Reservation.findById(currentRoom.reservations[i]);
        //     if (
        //         (new Date(startDate) >= currentReservation.startDate
        //             && new Date(startDate) < currentReservation.endData) ||
        //         (new Date(endDate) >= currentReservation.startDate
        //             && new Date(endDate) < currentReservation.endData)
        //     ) {
        //         return res.status(409).json({
        //             errors: [{
        //                 msg: "Reservation conflict",
        //                 reservation: currentReservation
        //             }]
        //         });
        //     }
        // }
        const reservation = new Reservation({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            type,
            room:currentRoom._id,
            user: req.user.id
        });
        try {
            await reservation.save();
            currentRoom.reservations.push(reservation._id);
            await currentRoom.save();
            res.status(201).json(reservation);
        } catch (e) {
            res.status(500).json({errors: [{msg: e.message}]});
        }
    });



router.put("/:id",
    [
        check("startDate").isDate().optional(),
        check("endDate").isDate().optional(),
        check("type").isIn(['full', 'b&b', 'half']).optional(),
        check("roomId").exists().optional(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        if (!req.user) {
            return res.status(401).json({errors: [{msg: "You are not logged in"}]});
        }
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({errors: [{msg: "Reservation not found"}]});
        }

        const {startDate, endDate, type, roomId} = req.body;

        if (startDate) {
            reservation.startDate = new Date(startDate);
        }
        if (endDate) {
            reservation.endDate = new Date(endDate);
        }
        if (type) {
            reservation.type = type;
        }
        if (roomId) {
            const currentRoom = await Room.findOne({roomId:roomId});
            currentRoom.reservations.push(reservation._id);
            if (!currentRoom) {
                return res.status(404).json({errors: [{msg: "Room not found"}]});
            }
            reservation.room = currentRoom._id;
        }

        try {
            await reservation.save();
            res.status(201).json(reservation);
        } catch (e) {
            res.status(500).json({errors: [{msg: e.message}]});
        }
    });

router.delete("/:id",
    async (req, res) => {
        try {
            const reservation = await Reservation.findById(req.params.id).exec();
            if (!reservation) {
                return res.status(404).json({errors: [{msg: "Reservation not found"}]});
            }
            const currentRoom = await Room.findById(reservation.room);
            if (!currentRoom) {
                await Reservation.findByIdAndDelete(reservation._id);
                return res.status(404).json({errors: [{msg: "Room not found"}]});
            }
            currentRoom.reservations = currentRoom.reservations.filter(reservation => reservation.toString() !== req.params.id);
            await Reservation.findByIdAndDelete(req.params.id);
            await currentRoom.save();
            return res.status(200).json({msg: "Reservation deleted"});
        } catch (e) {
            res.status(500).json({errors: [{msg: e.message}]});
        }
    });


// pagination
router.get("/",
    async (req, res) => {
        try {
            const perPage = req.query.perPage * 1 || config.get('perPage') * 1;
            const page = req.query.page * 1 || 0;
            let users = await Reservation.find().populate("user", "-password")
                .populate("room").limit(perPage).skip(perPage * page);
            let count = await Reservation.countDocuments();
            return res.json({users, count});
            
        } catch (e) {
            res.status(500).json({errors: [{msg: e.message}]});
        }
    });

module.exports = router;