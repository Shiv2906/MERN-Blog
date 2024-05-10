import express from 'express'
import {varifyToken} from '../utils/varifyUser.js'
import {createComment, getPostComments} from '../controllers/comment.controller.js'

const router = express.Router();

router.post('/create', varifyToken,createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;