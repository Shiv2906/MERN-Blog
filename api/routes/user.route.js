import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { varifyToken } from '../utils/varifyuser.js';

const router = express.Router()

router.get('/test' , test)
// here first user varify using varifyToken after this call update user 
router.put('/update/:userId', varifyToken,updateUser);

export default router;