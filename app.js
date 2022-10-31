// imports
const express = require('express')
const app = express()
const port = 3000

// database connection
require('./Database/connect')

//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

//Routes
const home = require('./Routes/home')
const auth = require('./Routes/auth')
const project = require('./Routes/project')
const staff = require('./Routes/staff')
const emp = require('./Routes/emp')

//  Onboarding Routes
app.use('/', home)

// Authentication Routes
app.use('/auth', auth)

// Project Specific Routes
app.use('/project', project)

// Staff Specific Routing
app.use('/staff', staff)

// Emp admin Routing
app.use('/emp',emp)

app.use((req,res) => {
    res.render('404')
})

// Listen on port 3000
app.listen(port, () => console.info('Listening on 3000'))