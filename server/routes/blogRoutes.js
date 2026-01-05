import express from 'express';
import { 
    addBlog, 
    getAllBlogs, 
    getBlogById, 
    deleteBlogById, 
    togglePublish, 
    addComment, 
    getBlogComments, 
    generateContent 
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

// Public routes
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);

// Admin/Protected routes
blogRouter.post('/add', auth, upload.single('image'), addBlog);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

// Fixed: Added the missing closing parenthesis ')'
blogRouter.post('/generate-content', auth, generateContent);

// Fixed: Added the default export
export default blogRouter;