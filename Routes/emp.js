const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const project = require('../Database/model_project');
const staff = require('../Database/model_staff');
const User = require('../Database/model_user');
dotenv.config()


router.get('/admin', (req, res) => {
    project.find({}, (err, projects) =>{
        // res.render('admin', {
        //     projectsList: projects
        // })
        staff.find({}, (err, staffs) =>{
            res.render('admin', {
                staffsList: staffs, projectsList: projects
            })
        })
    })
    
})

router.get('/viewproject', (rer, res) => {
    project.find({}, (err, projects) =>{
        // res.render('admin', {
        //     projectsList: projects
        // })
        staff.find({}, (err, staffs) =>{
            res.render('emp_view_project', {
                staffsList: staffs, projectsList: projects
            })
        })
    })

})



router.get(`/${process.env.code}/dashboard`, (req, res) => {
    
    project.find({}, (err, projects) =>{
    
        staff.find({}, (err, staffs) =>{
            res.render('employee', {
                staffsList: staffs, projectsList: projects
            })
        })
    })

})


module.exports = router
