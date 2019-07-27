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
        return parseInt(adjustedHours)
    } else if (newAuth > oldAuth) {
        var adjustedHours = (newAuth - oldAuth);
        return parseInt(adjustedHours)
    } else if (oldAuth == newAuth) {
        var adjustedHours = 0;
        return parseInt(adjustedHours)
    }
}

function insert(sup, pe, ind, x){
    var monthObj = {
        sup: parseInt(sup),
        pe: parseInt(pe),
        ind: parseInt(ind),
        month: x
        }
        
        return monthObj
}

function newAuthObj(sup, pe, ind) {
    var monthObjects= months.map(x => insert(sup, pe, ind, x))

    return monthObjects
}

router.post('/edit', check.authorized, (req, res, next) => {
    var { sup, pe, ind, client } = req.body;
    var newMonthlyAuth = {
        sup: parseInt(sup),
        pe: parseInt(pe),
        ind: parseInt(ind)
    }

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { 'clients.$[client].monthlyAuth': newMonthlyAuth },
        { returnNewDocument: true, arrayFilters: [{ 'client.name': client }] },
        (err) => { if (err) console.log(err) }
    )

    return next();
})

// // This function was intended to adjust any monthly hours that had already been used throughout the month in which the change occurred
// // However, not sure if I just didn't think it out correctly, but it gets a bit buggy, no server errors, just mathematical..
// router.post('/edit', check.authorized, (req, res, next) => {
//     var { sup, pe, ind, ogSup, ogPe, ogInd, client } = req.body;
//     var supQuery = 'clients.$[client].currentMonth.$[month].sup'
//     var indQuery = 'clients.$[client].currentMonth.$[month].ind'
//     var peQuery = 'clients.$[client].currentMonth.$[month].pe'
//     var supAdjustment = adjustHours(sup, ogSup);
//     var indAdjustment = adjustHours(ind, ogInd);
//     var peAdjustment = adjustHours(pe, ogPe);

//     User.findByIdAndUpdate(
//         { _id: req.user._id },
//         { $inc: { [supQuery]: supAdjustment, [indQuery]: indAdjustment, [peQuery]: peAdjustment } },
//         {
//             returnNewDocument: true,
//             arrayFilters: [{ 'client.name': client }, { 'month.month': thisMonth }]
//         },
//         (err) => { if (err) console.log(err) }
//     )

//     return next();
// })


router.post('/edit', check.authorized, (req, res) => {
    var { sup, pe, ind, client } = req.body;
    var newMonths = newAuthObj(sup, pe, ind);


    User.findByIdAndUpdate(
        { _id: req.user._id },
        {'clients.$[client].currentMonth': newMonths},
        { returnNewDocument: true, 
        arrayFilters: [{'client.name': client}] },
        (err, success) => {
            if (err) console.log(err);
            if (success) res.redirect('back')
        }
    )

})



module.exports = router