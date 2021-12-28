const express = require('express');
const router = express.Router();
const Review = require('../services/database/models/review');

router.get('/:id' , async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) {
            return res.status(404).send({
                message: 'Review not found'
            });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;