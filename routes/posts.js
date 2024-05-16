


const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

router.post('/', postsController.createPost);
router.get('/:email', postsController.getAllPosts);
router.delete('/:id', postsController.deletePost);
router.get('/:id', postsController.updatePost);
router.put('/:id', postsController.updatePostContent);
//router.get('/:id', postsController.getPost);
//router.get('/:email', postsController.getUserFriendsPosts);
module.exports = router;
