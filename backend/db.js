const mongoose = require("mongoose")
require('dotenv').config()

// const mongodburl = process.env.MONGODB_LOCAL_URL
const mongodburl = process.env.MONGODB_URL

mongoose.connect(mongodburl)

const db = mongoose.connection

db.on("connected",() =>{
    console.log("Mongodb connected")
})

db.on("error",(err) => {
    console.log("Some internal error occured",err)
})

db.on("disconnected",()=>{
    console.log("Mongodb disconnected")
})

module.exports = db
