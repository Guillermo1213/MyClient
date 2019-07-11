const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const check = require('../passport/checkAuth')
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var now = new Date();
var thisMonth = months[now.getMonth()];

function adjustHours(newAuth, oldAuth) {
    if (oldAuth > newAuth) {
        var adjustedHours = -(oldAuth - newAuth);
        return adjustedHours
    } else if (newAuth > oldAuth) {
        var adjustedHours = (newAuth - oldAuth);
        return adjustedHours
    } else if (oldAuth == newAuth) {
        var adjustedHours = 0;
        return adjustedHours
    }
}

router.post('/edit', check.authorized, (req, res, next) => {
    const { sup, pe, ind, client } = req.body;
    const newMonthlyAuth = {
        sup: sup,
        pe: pe,
        ind: ind
    }

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { 'clients.$[client].monthlyAuth': newMonthlyAuth },
        { returnNewDocument: true, arrayFilters: [{ 'client.name': client }] },
        (err) => {if (err) console.log(err)}
    )

    next();
})

router.post('/edit', check.authorized, (req, res, next) => {
    const { sup, pe, ind, ogSup, ogPe, ogInd, client } = req.body;
    const supQuery = 'clients.$[client].currentMonth.$[month].sup'
    const indQuery = 'clients.$[client].currentMonth.$[month].ind'
    const peQuery = 'clients.$[client].currentMonth.$[month].pe'
    const supAdjustment = adjustHours(sup, ogSup);
    const indAdjustment = adjustHours(ind, ogInd);
    const peAdjustment = adjustHours(pe, ogPe);

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $inc: { [supQuery]: supAdjustment, [indQuery]: indAdjustment, [peQuery]: peAdjustment } },
        {
            returnNewDocument: true,
            arrayFilters: [{ 'client.name': client }, { 'month.month': thisMonth }]
        },
        (err) => {if (err) console.log(err)}
    )

    // next()
})


// //Send a whole new currentMonth object?
// router.post('/edit', check.authorized, (req) => {
//     const { sup, pe, ind, client } = req.body;
//     var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// 	var now = new Date();
//     var thisMonth = months[now.getMonth()];
//     const newMonthlyAuth = {
//         sup: sup,
//         pe: pe,
//         ind: ind
//     }

//     User.findByIdAndUpdate(
//         { _id: req.user._id },
//         {$inc: {[query]: data}},
//         { returnNewDocument: true, 
//         arrayFilters: [{'client.name': client}, {'month.month': thisMonth}] },
//         (err) => console.log(err)
//     )
// })



module.exports = router