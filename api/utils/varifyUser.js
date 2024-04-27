import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

export const varifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unautorized'));
        
    }

    jwt.verify(token, process.env.JWT_SECURET_KEY, (err, user) =>{
        if(err)
        {
            return next(errorHandler(401, 'Unautorized'));
        }

        req.user = user;
        next();
    });

};