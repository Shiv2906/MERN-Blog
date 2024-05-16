import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// when we export default then we can access this with another name also just like router
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'

import cookieParser from 'cookie-parser'
import path from'path'


// It is used for access the variable from .env
dotenv.config()

// connecting to database 
mongoose.connect(process.env.DB_CONN)
.then(()=>{
    console.log("MongoDB is connected");
})
.catch((e)=>{
    console.log("Error is : ", e);
})

// it is used for deploy on render
const __dirname = path.resolve();
const app = express()
// convert user entered data into json formate
app.use(express.json())

// use cookieParser for take info from the stored cookie
app.use(cookieParser()) ;


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})

// Routes for Various functionality
app.use('/api/user' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/post' , postRoutes)
app.use('/api/comment' , commentRoutes)

// static path to connect dirname with dist 
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname,'/client', 'dist', 'inde.html'));
} );

// Middleware for handle the error 
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!";
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});
