const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const postController = require('../controllers/post');

router.get('/posts', postController.getAllPosts);

router.get('/posts/:postId', postController.getSinglePost);

router.post('/create-post', isAuth.verifyToken, postController.createPost);

router.delete('/posts/:postId', isAuth.verifyToken, postController.deletePost);

router.put('/posts/:postId', isAuth.verifyToken, postController.updatePost);

module.exports = router;
