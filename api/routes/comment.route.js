import express from 'express'
import {varifyToken} from '../utils/varifyUser.js'
import {createComment, getPostComments, likeComment} from '../controllers/comment.controller.js'

const router = express.Router();

router.post('/create', varifyToken,createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', varifyToken, likeComment);

export default router;