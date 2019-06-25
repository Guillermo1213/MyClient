const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')
const moment = require('moment')
const uuidv1 = require('uuid/v1')

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
    const userST = date + " " + time;
    const start = formatStartTime(userST);
    const end = formatEndTime(start, duration);
    const billingMonth = month(start);
    var uuid = uuidv1();
    var title = eventTitle(client, code);
    const newEvent = {
        title: title,
        start: start,
        end: end,
        id: uuid
    }

    adjustHours(req.user._id, client, code, duration, billingMonth);
    // User.findByIdAndUpdate(
    //     { _id: req.user._id },
    //     { $push: { events: newEvent } }, 
    //     () => res.redirect('back')
    // )

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

function eventTitle(client, code) {
    var title;
    if (client == 'NA') {
        title = 'Clinic Development';
        return title
    } else {
        title = code + " for " + client;
        return title
    }
}

function month(start) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = moment(start).month()
    var monthString = months[d]
    return monthString
}

function adjustHours(id, client, code, duration, billingMonth) {

    User.findOneAndUpdate({_id: id, "clients": {Name: client}
    // , "Current_Month": {Month: billingMonth}
}
    // , {$inc: {[code]: -duration}}
    ,
    err => console.log(err),
    res => console.log(res)
    )
}

module.exports = router