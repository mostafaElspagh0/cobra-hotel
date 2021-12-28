const express = require('express');
const router = express.Router();
const Room = require("../services/database/models/room");
const config = require("config");
const {check, validationResult} = require('express-validator');
const {isA} = require("../services/auth/middlelayers/rolesMiddleLayer");
const HotelRoom = require("../services/database/models/room");
const Customer = require("../services/database/models/customer");
const Item = require("../services/database/models/item");


//-------pagination
router.get("/",
    [
        isA(["Receptionist", "Manager"]),
    ],
    async (req, res) => {
        const perPage = req.query.perPage * 1 || config.get('perPage') * 1;
        const page = req.query.page * 1 || 0;

        let rooms = await Room.find().limit(perPage).skip(perPage * page);
        let total = await Room.countDocuments();
        return res.json({rooms, total});

    });

router.get("/:id",
    [
        isA(["Receptionist", "Manager"]),
    ],
    async (req, res) => {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({msg: "Room not found"});
        return res.json(room);
    });


router.post("/",
    [
        isA(["Manager"]),
        check("roomId").isLength({min: 1}),
        check("type")
            .isLength({min: 1})
            .isIn(['single', 'double', 'triple', 'quad', 'queen', 'king']),
        check("price").isNumeric(),
        check("roomStatus").isIn(['available', 'booked', 'cleaning', 'maintenance']),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        if (!req.user) {
            return res.status(401).json({errors: [{msg: "Unauthorized"}]});
        }
        const {roomId, type, price, roomStatus} = req.body;
        const rooms = await Room.find({roomId}).exec();
        if (rooms.length > 0) {
            return res.status(409).json({errors: [{msg: "Room already exists"}]});
        }
        const newRoom = new Room({roomId, type, price, roomStatus, createdBy: req.user.id});
        await newRoom.save();
        return res.json(newRoom);
    });


router.delete("/:id",
    [
        isA(["Manager"]),
    ],
    async (req, res) => {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({errors: [{msg: "Room not found"}]});
        }
        await room.remove();
        return res.json({msg: "Room deleted"});
    });

router.put("/:id",
    [
        isA(["Manager"]),
        check("roomId").isLength({min: 1}).optional(),
        check("type").isLength({min: 1}).optional(),
        check("price").isNumeric().optional(),
        check("roomStatus").isIn(['available', 'booked', 'cleaning', 'maintenance']).optional(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({errors: [{msg: "Room not found"}]});
        }
        const {roomId, type, price, roomStatus} = req.body;
        if (roomId) {
            const room = await Room.find({roomId}).exec();
            if (room.length > 0) {
                return res.status(409).json({errors: [{msg: "Room already exists"}]});
            }
            room.roomId = roomId;
        }
        if (type) {
            room.type = type;
        }
        if (price) {
            room.price = price;
        }
        if (roomStatus) {
            room.roomStatus = roomStatus;
        }
        try {
            await room.save();
            return res.json(room);
        } catch (e) {
            return res.status(500).json({errors: [{msg: e.message}]});
        }
    });


router.post("/checkIn/:id", [
    isA(['Manager', 'Receptionist']),
    check('customers').isArray({min: 1}).withMessage('customers is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const room = await HotelRoom.findById(req.params.id);
        if (!room) {
            return res.status(422).json({errors: [{msg: 'Room not found'}]});
        }
        if (room.roomStatus === 'occupied') {
            return res.status(422).json({errors: [{msg: 'Room is occupied'}]});
        }
        const ids = [];
        for (let i = 0; i < req.body.customers.length; i++) {
            const customer = new Customer({
                name: req.body.customers[i].name,
                room: room._id,
                checkin: new Date(),
                nationality: req.body.customers[i].nationality,
                email: req.body.customers[i].email,
                phone: req.body.customers[i].phone,
                address: req.body.customers[i].address,
            });
            await customer.save();
            ids.push(customer._id);
        }
        room.roomStatus = 'occupied';
        room.customers = ids;
        await room.save();
        res.json({
            message: 'Customer checked in successfully',
            room: room
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: [{msg: 'Server error'}]
        });
    }
});

router.get("/checkOut/:id", [
        isA(['Manager', 'Receptionist']),
    ],
    async (req, res) => {
        try {
            const room = await HotelRoom.findById(req.params.id).populate('customers');
            if (!room) {
                return res.status(422).json({errors: [{msg: 'Room not found'}]});
            }
            if (room.roomStatus !== 'occupied') {
                return res.status(422).json({errors: [{msg: 'Room is available'}]});
            }

            let price = room.price * Math.max(1,
                (new Date().getTime()
                    - room.customers[0].checkin.getTime()) / (1000 * 3600 * 24));
            let items = [];
            for(let i = 0 ; i < room.items.length; i++){
                const item = await Item.findById(room.items[i]);
                items.add(item);
                price += item.price;
            };
            res.json({
                message: 'Customer checked out successfully',
                room: room,
                items : items,
                price: price
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                errors: [{msg: 'Server error'}]
            });
        }
    });
router.post("/checkOut/:id", [
        isA(['Manager', 'Receptionist']),
    ],
    async (req, res) => {
        try {
            const room = await HotelRoom.findById(req.params.id).populate('customers');
            if (!room) {
                return res.status(422).json({errors: [{msg: 'Room not found'}]});
            }
            if (room.roomStatus !== 'occupied') {
                return res.status(422).json({errors: [{msg: 'Room is available'}]});
            }

            let price = room.price * Math.max(1,
                (new Date().getTime()
                    - room.customers[0].checkin.getTime()) / (1000 * 3600 * 24));
            for (let i = 0; i < room.customers.length; i++) {
                const customer = await Customer.findById(room.customers[i]);
                customer.checkout = new Date();
                await customer.save();
            }
            room.roomStatus = 'available';
            room.customers = [];
            let items = [];
            await room.save();
            for(let i = 0 ; i < room.items.length; i++){
                const item = await Item.findById(room.items[i]);
                items.add(item);
                price += item.price;
            };
            res.json({
                message: 'Customer checked out successfully',
                room: room,
                items : items,
                price: price
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                errors: [{msg: 'Server error'}]
            });
        }
    });
module.exports = router;