const mongoose  = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected....");
}).catch((e)=>{
    console.log(e);
})
