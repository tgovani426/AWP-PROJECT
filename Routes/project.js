const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const project = require('../Database/model_project');


const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/newProject',(req,res)=>{
    res.render('new_project')
})
router.post('/newProject', urlencodedParser, (req, res) => {
    const { projectname, clientmanager, companyname, email, projid, projmanager, dept, budgt, deadline } = req.body

    let new_project = new project({
        projname : projectname,
        clientmgr : clientmanager ,
        clientcompanynm : companyname,
        email : email,
        projectid: projid,
        projectmgr: projmanager,
        department: dept,
        budget: budgt,
        DOB:deadline
    })
    new_project.save().then(console.log('1 record inserted'))

    res.render('new_project')
})
router.get('/updateProject', (req, res) => {
    res.render('update_project')
})
router.post('/updateProject',urlencodedParser, (req, res) => {

    const { projectname, clientmanager, companyname, email, projid, projmanager, dept, budgt, deadline } = req.body

    let update_project = {
        projname : projectname,
        clientmgr : clientmanager ,
        clientcompanynm : companyname,
        email : email,
        projectid: projid,
        projectmgr: projmanager,
        department: dept,
        budget: budgt,
        DOB:deadline
    }

    project.findOneAndUpdate({projectid:projid},update_project,(err,result)=>{
        if(err) throw err
        res.render('view_project')

    })
    // res.render('update_project')
})
router.get('/viewProject', (req, res) => {
    res.render('view_project')
})


module.exports = router
