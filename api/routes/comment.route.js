import express from 'express'
import {varifyToken} from '../utils/varifyUser.js'
import {createComment} from '../controllers/comment.controller.js'

const router = express.Router();

router.post('/create', varifyToken,createComment);

export default router;