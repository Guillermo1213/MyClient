const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const check = require('../passport/checkAuth')

// router.get('/client/view', check.authorized, (req, res) => {
//     User.find({
//         _id: req.user._id, 'clients.currentMonth': { month: thisMonth }
//     }, function (err, hours) {
//         console.log(hours);
//         if (err) return res.send(err)
//         res.send(hours);
//     })
// });

// router.post('/edit', check.authorized, (req, res) => {
//     const { sup, pe, ind } = req.body;
//     const userST = date + " " + time;
//     const start = formatStartTime(userST);
//     const billing_month = month(start);
//     const query = 'clients.$[client].currentMonth.$[month].' + code

//     User.findByIdAndUpdate(
//         { _id: req.user._id },
//         { $inc: { [query]: -duration } },
//         {
//             returnNewDocument: true,
//             arrayFilters: [{ 'client.name': client }, { 'month.month': billing_month }]
//         },
//         function (err, res) {
//             if (err) res.sendStatus(500);
//             if (res) res.send('Hours updated');
//         }
//     )

// })

router.get('/edit', check.authorized, (req, res) => {
    const { sup, pe, ind, client } = req.body;

    const newMonthlyAuth= {
        sup: sup,
        pe: pe,
        ind: ind
    }

    // User.find({
    //     _id: req.user._id
    // }, function (err, data) {
    //     if (err) return res.send(err)
    //     res.send(data);
    // });

    User.findByIdAndUpdate(
        { _id: req.user._id },
        // { 'events.$[event]': editedEvent },
        // { returnNewDocument: true, arrayFilters: [{ 'event.id': event_id }] },
        (err, data) => {
            if (err) console.log(err)
            if (data) res.send(newMonthlyAuth);
        }
    )

})


module.exports = router