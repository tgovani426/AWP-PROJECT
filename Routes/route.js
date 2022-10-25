const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const User = require('../db/model');
const bcrypt = require('bcrypt')

dotenv.config()

const urlParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
   res.render('home')
})

router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('message') })
})


router.post('/login', urlParser, (req, res) => {
    const { email, pass } = req.body

    User.findOne({ email: email }, (err, data) => {
        console.log(data['pass']);
        const pass_db = data['pass']

        bcrypt.compare(pass, pass_db, (err, result) => {
            if (err) throw err

            if (result) {
                res.render('DashBoard')
            }
            else {
                req.flash('message', 'Invalid Credentials')
            }
        })
    })
})


router.get('/register', (req, res) => {
    res.render('register', { message: req.flash('message') })
})

router.post('/register', urlParser, (req, res) => {
    const { name, email, pass, c_pass } = req.body

    if (!name || !email || !pass || !c_pass) {
        req.flash('message', 'Please fill all the fields.')
        res.redirect('/register')
    }
    if (pass !== c_pass) {
        req.flash('message', 'Invalid password')
        res.redirect('/register')

    }
    else {

        User.findOne({ email: email }, function (err, data) {
            if (err) throw err

            if (data) {
                req.flash('message', 'This user already exist.')
                res.redirect('/register')
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
                            res.redirect('/login');
                            req.flash('success_msg', 'You have now registered!')
                        })
                    })
                })
            }
        })
    }

})

router.get('/ForgetPassword', (req, res) => {
    res.render('ForgetPassword')
})

router.post('/ForgetPassword', (req, res) => {
    const email = (req.body.email)
    console.log(email);
    res.render('ForgetPassword')
    const options = {
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.PASSWORD
        }
    }

    const Transport = nodemailer.createTransport(options)

    const mailOption = {
        to: email,
        form: process.env.EMAIL_FROM,
        subject: 'USER DETAILS',
        text: "HELLO WORLD"
    }

    Transport.sendMail(mailOption, (err, data) => {
        if (err) throw err

        console.log(data);
    })
})

module.exports = router

