import express from 'express';
import { getAllBlogs, createBlog } from '../controllers/blogController.js'
import auth from '../middleware/auth-middleware.js'

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', auth, createBlog);
// router.patch('/:id', auth, updateBizness);
// router.delete('/:id', auth, deleteBizness);

export default router;