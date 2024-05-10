import express from 'express'
import { deleteUser, getUser, getUsers, signout, test, updateUser } from '../controllers/user.controller.js';
import { varifyToken } from '../utils/varifyUser.js';


const router = express.Router()

router.get('/test' , test)
// here first user varify using varifyToken after this call update user 
router.put('/update/:userId', varifyToken,updateUser);
router.delete('/delete/:userId', varifyToken,deleteUser);
router.post('/signout', signout);
router.get('/getusers', varifyToken,getUsers);
// get user which comments on the post
router.get('/:userId', getUser)

export default router;