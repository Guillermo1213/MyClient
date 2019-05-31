const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')


router.get('/', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.redirect('/user')
            })
        }
    })
})

router.post('/', 
    passport.authenticate('local'),
    (req, res) => {
        res.redirect('/dashboard');
    }
)


router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/user')
})

module.exports = router