const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const check = require('../passport/checkAuth')

router.get('/', check.authorized, (req, res) => {
    User.find({
        _id: req.user._id
    }, function (err, data) {
        if (err) return res.send(err)
        res.render('dashboard', { title: 'dashboard', clients: data[0].clients, layout: 'user' });
    });
});

module.exports = router