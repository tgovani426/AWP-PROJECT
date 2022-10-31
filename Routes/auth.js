const express = require('express')
const router = express.Router()
const User = require('../Database/model_user');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const urlParser = bodyParser.urlencoded({ extended: false })

dotenv.config()

router.get('/signup', (req, res) => {
    res.render('sign_up')
})

router.post('/signup', urlParser, (req, res) => {
    const { name, email, pass } = req.body

    User.findOne({ email: email }, (err, data) => {
        if (err) throw err

        if (data) {
            //Add flash message
            res.redirect('/auth/signup?error=' + encodeURIComponent('Incorrect_Credential'))
        }
        else {
            var newUser = new User({
                name: name,
                email: email,
                pass: pass
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.pass, salt, (err, hash) => {
                    if (err) throw err
                    newUser.pass = hash
                    newUser.save().then((value) => {
                        res.redirect('/auth/signin');
                    })
                })
            })

        }
    })
})


router.get('/signin', (req, res) => {

    res.render('sign_in')
})

router.post('/signin', urlParser, (req, res) => {
    const { name, email, pass } = req.body
    if (!name || !email || !pass) {
        res.redirect('/auth/signin?error=' + encodeURIComponent('Incorrect_Credential'));
    }

    User.findOne({ email: email, name: name }, (err, data) => {
        if (err) throw err

        if (!data) {
            res.redirect('/auth/signin?error=' + encodeURIComponent('Incorrect_Credential'));
        }
        else if (data) {
            const db_pass = data['pass']
            bcrypt.compare(pass, db_pass, (err, result) => {
                if (err) throw err

                if (result) {
                    res.redirect(`/emp/${process.env.code}/dashboard`)
                }
                else {
                    // Add flash message
                    console.log('Invalid');
                    res.redirect('/auth/signin?error=' + encodeURIComponent('Incorrect_Credential'))
                }
            })
        }

    })



})

module.exports = router





