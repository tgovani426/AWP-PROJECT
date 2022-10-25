const mongoose  = require('mongoose')

mongoose.connect("mongodb://localhost:27017/MINI_SAP").then(()=>{
    console.log("Database Connected....");
}).catch((e)=>{
    console.log(e);
})
