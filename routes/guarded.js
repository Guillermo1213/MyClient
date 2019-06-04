const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')


router.get('/', checkAuthentication, (req, res) => {
    res.render('dashboard', {title: 'dashboard', layout: 'user'});
})
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/user");
    }
}

module.exports = router