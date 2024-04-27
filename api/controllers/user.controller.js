import User from "../model/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypjs from 'bcryptjs'

export const test =  (req, res)=>{
    res.json({message : 'Hello '})
} 


export const updateUser = async(req, res, next)=>{

    if(req.user.id != req.params.userId){
        return next(errorHandler(403, "You are not allowed to update this user"));
    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, "Password must be at least 6 characters"))
        }
        req.body.password = bcrypjs.hashSync( req.body.password, 10);
    }

    if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20)
    {
        return next(errorHandler(400, " Username must be betweeen 7 and 20 characters"));

    }
    if(req.body.username.includes(' '))
    {
        return next(errorHandler(400, " Username can not contain spaces"))
    }

    if(req.body.username !== req.body.username.toLowerCase())
    {
        return next(errorHandler(400, " Username must be lowercase"))
    }

    if(!req.body.username.match(/^[a-zA-Z0-9]+$/))
    {
        return next(errorHandler(400, " Username can only contain letters and numbers"));

    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                profilePicture : req.body.profilePicture,
            },
        }, 
    // it is used for get the updated value
        {new : true}
    );

    const {password , ...rest} = updateUser._doc
;
res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}

}