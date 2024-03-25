
const postsController = require('../controllers/posts');

const express = require('express');
var router = express.Router();

router.route('/')
.post(postsController.createPost);

module.exports = router;