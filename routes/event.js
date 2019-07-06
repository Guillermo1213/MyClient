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

function adjustHours(duration, oD){
    if(oD > duration){
        var adjustedDuration = (oD-duration);
        return adjustedDuration
    } else if (duration > oD){
        var adjustedDuration = -(duration-oD);
        return adjustedDuration
    } else if (oD == duration){
        var adjustedDuration = 0;
        return adjustedDuration
    }
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
    const billing_month = month(start);
    const query = 'clients.$[client].currentMonth.$[month].' + code

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $inc: { [query]: -duration } },
        {
            returnNewDocument: true,
            arrayFilters: [{ 'client.name': client }, { 'month.month': billing_month }]
        },
        function (err, res) {
            if (err) res.sendStatus(500);
            if (res) console.log('Hours updated');
        }
    )

    next();
})

router.post('/add', check.authorized, (req, res) => {
    const { client, code, time, duration, date } = req.body;
    const userST = date + " " + time;
    const start = formatStartTime(userST);
    const end = formatEndTime(start, duration);
    const billing_month = month(start);
    var uuid = uuidv1();
    var title = eventTitle(client, code);
    const newEvent = {
        title: title,
        client: client,
        code: code,
        start: start,
        end: end,
        duration: duration,
        id: uuid,
        billing_month: billing_month
    }

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { events: newEvent } },
        (err, success) => {
            if (err) console.log(err)
            if (success) res.redirect('back')
        }
    )

})

router.post('/edit', check.authorized, (req, res, next) => {
    const { event_client_name, event_code, time, duration, date, event_duration} = req.body;
    const userST = date + " " + time;
    const start = formatStartTime(userST);
    const billing_month = month(start);
    const query = 'clients.$[client].currentMonth.$[month].' + event_code
    const data = adjustHours(duration, event_duration);

    User.findByIdAndUpdate(
        {_id: req.user._id},
        //not updating properly
        {$inc: {[query]: data}},
        {returnNewDocument: true,
        arrayFilters: [{'client.name': event_client_name}, {'month.month': billing_month}]
        },
        function (err, success) {
            if (err) res.sendStatus(500);
            if (res) console.log('Hours updated');
        }
    )

    next();
})

router.post('/edit', check.authorized, (req, res) => {
    const { event_client_name, event_code, time, duration, date, event_id } = req.body;
    const userST = date + " " + time;
    const start = formatStartTime(userST);
    const end = formatEndTime(start, duration);
    var title = eventTitle(event_client_name, event_code);

    const editedEvent = {
        title: title,
        client: event_client_name,
        code: event_code,
        start: start,
        end: end,
        duration: duration,
        id: event_id
    }

    User.findByIdAndUpdate(
        { _id: req.user._id },
         // not updating current fields, but updating object as a whole, erasing client & billingCode
        { 'events.$[event]': editedEvent },
        { returnNewDocument: true, arrayFilters: [{ 'event.id': event_id }] },
        (err, success) => {
            if (err) console.log(err)
            if (success) res.redirect('back')
        }
    )

})

router.post('/delete', check.authorized, (req, res, next) => {
    const { event_client_name, event_code, event_billing_month, event_duration} = req.body;
    const query = 'clients.$[client].currentMonth.$[month].' + event_code
    const duration = parseInt(event_duration);
    User.findByIdAndUpdate(
        {_id: req.user._id},
        //not updating properly
        {$inc: {[query]: duration}},
        {returnNewDocument: true,
        arrayFilters: [{'client.name': event_client_name}, {'month.month': event_billing_month}]
        },
        function (err, success) {
            if (err) console.log(err);
            if (success) console.log('Hours updated');
        }
    )

    next();
})

router.post('/delete', check.authorized, (req, res) => {
    const { event_id } = req.body;

    User.findByIdAndUpdate(
        { _id: req.user._id },
         // not updating current fields, but updating object as a whole, erasing client & billingCode
        {$pull: {events: {id: event_id}} },
        (err, success) => {
            if (err) console.log(err)
            if (success) res.redirect('back')
        }
    )

})



module.exports = router