import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
        unique : true,
    },
    image : {
        type: String,
        default : 'https://th.bing.com/th/id/R.5e1bb93a2e7ce90201a105a8afe1ce10?rik=AgOC80Lw63HS7w&riu=http%3a%2f%2fbloginteligenciacolectiva.com%2fwp-content%2fuploads%2f2013%2f08%2fblogs-bloguers.jpg&ehk=VMa1WN76AZQoCDxIhbDvxReweLU%2bS9YP4u3UHyuiEwQ%3d&risl=&pid=ImgRaw&r=0'

    },
    category : {
        type : String,
        default : 'Uncategorized',
    },
    slug : {
        type : String,
        required: true,
        unique: true,
    }
}, {timestamps : true}
);


const Post = mongoose.model("Post", postSchema);


export default Post;

