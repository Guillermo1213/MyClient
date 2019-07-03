const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const check = require('../passport/checkAuth')

router.get('/client/view', check.authorized, (req, res) => {
    User.find({
        _id: req.user._id, 'clients.currentMonth': { month: thisMonth }
    }, function (err, hours) {
        console.log(hours);
        if (err) return res.send(err)
        res.send(hours);
    })
});

module.exports = router