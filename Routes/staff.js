const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const staff = require('../Database/model_staff');

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/addStaff', (req, res) => {
    res.render('add_staff')
})

router.post('/addStaff', urlencodedParser, (req, res) => {
    const { empname, empemail, phn_num, emp_number, department, salary, DOjoining } = req.body

    let new_staff = new staff({
        employee_name : empname,
        email : empemail,
        phone_no: phn_num,
        employee_number: emp_number,
        department: department,
        emp_salary: salary,
        DOB:DOjoining
    })
    new_staff.save().then(console.log('new staff entered'))
    res.render('add_staff')
})
// update is still left 
router.get('/updateStaff', (req, res) => {
    res.render('update_staff')

})

router.post('/updateStaff' ,urlencodedParser, (req, res) =>{
    const { emp_number, phn_num, department, salary } = req.body

    let update_staff = {
        employee_number: emp_number,
        phone_no: phn_num,
        department: department,
        emp_salary: salary
    }

    staff.findOneAndUpdate({employee_number: emp_number},update_staff,(err,result)=>{
        if(err) throw err
        res.render('update_staff')

    })
})

router.get('/delStaff', (req, res) => {
    res.render('del_staff')
})

router.post('/delStaff' ,urlencodedParser, (req, res) =>{
    const { emp_number, phn_num } = req.body

    let delete_staff = {
        employee_number: emp_number,
        phone_no: phn_num,
    }

    staff.findOneAndUpdate({employee_number: emp_number, phone_no: phn_num},delete_staff,(err,result)=>{
        if(err) throw err
        else{
            console.log("deleted: ", result);
        }
        res.render('delete_staff')

    })
})

router.get('/viewStaff', (req, res) => {
    staff.find({}, (err, staffs) =>{
        res.render('view_staff', {
            staffsList: staffs
        })
    })
})

module.exports = router






