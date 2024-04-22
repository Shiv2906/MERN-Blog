import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true

    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
         type : String,
         required : true
    }
},
// it is used to store the extra information about the users like which time they create Id and update 
{timestamps : true}

);

const User = mongoose.model("User" , userSchema);

export default User;