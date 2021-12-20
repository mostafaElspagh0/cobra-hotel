const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        live:true
    });
});

module.exports = router;