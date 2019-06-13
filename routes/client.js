const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.get('/client/view', (req, res) => {
    User.find({
        _id: req.user._id, 'clients.Current_month': { Month: thisMonth }
    }, function (err, hours) {
        console.log(hours);
        if (err) return res.send(err)
        res.send(hours);
    })
    // User.find({
    //     _id: req.user._id
    // }, function (err, data) {
    //     if (err) return res.send(err)
    //     res.send(data);
    // });
});


module.exports = router