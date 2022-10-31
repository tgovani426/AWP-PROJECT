const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()


router.get('/admin', (req, res) => {
    res.render('admin')
})

router.get('/viewproject', (rer, res) => {
    res.render('emp_view_project')
})



router.get(`/${process.env.code}/dashboard`, (req, res) => {
    res.render('employee')
})


module.exports = router
