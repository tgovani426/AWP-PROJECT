const express = require('express')
const router = express.Router()


router.get('/addStaff', (req, res) => {
    res.render('add_staff')
})

router.get('/updateStaff', (req, res) => {
    res.render('update_staff')
})

router.get('/delStaff', (req, res) => {
    res.render('del_staff')
})

router.get('/viewStaff', (req, res) => {
    res.render('view_staff')
})

module.exports = router






