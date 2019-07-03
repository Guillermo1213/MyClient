const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const moment = require('moment')
const uuidv1 = require('uuid/v1')
const check = require('../passport/checkAuth')

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

router.get('/view', check.authorized, (req, res) => {
    User.find({
        _id: req.user._id
    }, function (err, data) {
        if (err) return res.send(err)
        res.send(data[0].events);
    });
});

router.post('/add', check.authorized, (req, res, next) => {
    const { client, code, time, duration, date } = req.body;
    const userST = date + " " + time;
    const start = formatStartTime(userST);
    const billingMonth = month(start);
    const query = 'clients.$[client].currentMonth.$[month].' + code

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {$inc: {[query]: -duration }},
        {returnNewDocument: true,
        arrayFilters: [{'client.name': client}, {'month.month': billingMonth}]
        },
        function (err, data) {
            if (err) console.log(err);
            if (data) console.log(data)
        }
    )

    next();
})

router.post('/add', check.authorized, (req, res) => {
    const { client, code, time, duration, date } = req.body;
    const userST = date + " " + time;
    const start = formatStartTime(userST);
    const end = formatEndTime(start, duration);
    var uuid = uuidv1();
    var title = eventTitle(client, code);
    const newEvent = {
        title: title,
        start: start,
        end: end,
        id: uuid
    }

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { events: newEvent} }, 
        (err, data) => {
            if (err) console.log(err)
            if (data) res.redirect('back')
        }
    )

})



module.exports = router