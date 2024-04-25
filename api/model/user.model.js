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
    },
    profilePicture : {
        type : String,
        default : "https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0"
    }
},
// it is used to store the extra information about the users like which time they create Id and update 
{timestamps : true}

);

const User = mongoose.model("User" , userSchema);

export default User;