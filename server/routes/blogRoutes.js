import express from 'express';
import { getAllBlogs, createBlog, updateBlog, deleteBlog, saveBlog, commentBlog } from '../controllers/blogController.js'
import auth from '../middleware/auth-middleware.js'

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', auth, createBlog);
router.patch('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);
router.patch('/:id/saveBlog', auth, saveBlog);
router.post('/:id/commentBlog', auth, commentBlog);

export default router;