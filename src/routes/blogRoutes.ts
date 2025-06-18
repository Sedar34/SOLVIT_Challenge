import { Router } from 'express';
import { BlogController } from '../controllers/BlogController';

const router = Router();

// Blog post routes
router.post('/createposts', BlogController.createPost);
router.get('/getAllposts', BlogController.getAllPosts);
router.get('/getByIdposts/:id', BlogController.getPostById);
router.get('/searchposts', BlogController.searchPosts);
router.get('/getRecentposts', BlogController.getRecentPosts);
router.get('/getStats', BlogController.getStats);
router.get('/getPostsByAuthor/:author', BlogController.getPostsByAuthor);
router.put('/updateposts/:id', BlogController.updatePost);
router.delete('/deleteposts/:id', BlogController.deletePost);

export default router;