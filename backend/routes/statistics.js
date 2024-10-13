const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Scheme = require('../models/Scheme');

// Route to get total users
router.get('/users/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments({});
        res.json({ userCount });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user count' });
    }
});

// Route to get schemes and their application count
router.get('/schemes/count', async (req, res) => {
    try {   
        const schemes = await Scheme.aggregate([
            { 
                $group: {
                    _id: "$schemename", 
                    appliedUsers: { $sum: 1 } // Counting how many users applied per scheme
                }
            }
        ]);
        res.json(schemes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching schemes count' });
    }
});

module.exports = router;
