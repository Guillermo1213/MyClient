const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')
const moment = require('moment')

router.get('/view', (req, res) => {
    User.find({
        _id: req.user._id
    }, function (err, data) {
        if (err) return res.send(err)
        res.send(data[0].events);
    });
});

router.post('/add', (req, res) => {
    const { client, code, time, duration, date } = req.body;
    const eventStart = date + " " + time;
    const start = formatStartTime(eventStart);
    const end = formatEndTime(start,duration);
    const newEvent = {
        title: code + " for " + client,
        start: start,
        end: end
    }
    console.log(newEvent)
    res.redirect('back');
    // User.findByIdAndUpdate(req.user._id, )
    //add event
    //update hours
})

function formatStartTime(userST) {
    const ST = userST;
    const startTime = moment(ST, 'MM/DD/YYYY hh:mm a').format();
    return startTime
}

function formatEndTime(start, duration) {
    const end = moment(start).add(duration, 'hours').format();
    return end
}

module.exports = router