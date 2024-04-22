import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// It is used for access the variable from .env
dotenv.config()

mongoose.connect(process.env.DB_CONN)
.then(()=>{
    console.log("MongoDB is connected");
})
.catch((e)=>{
    console.log("Error is : ", e);
})

const app = express()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})