const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')
const passport = require("passport");
const flash = require('connect-flash')
const UserRoute = require('./Routes/route')
require('./db/connect')

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'mySecret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}))

app.use(flash())

app.use('/user', UserRoute)

app.listen(PORT, () => {
    console.log(`Listening  on Port ${PORT}`);
})