
// const postsController = require('../controllers/posts');

// const express = require('express');
// var router = express.Router();

// router.route('/')
// .post(postsController.createPost);

// module.exports = router;

const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

router.post('/', postsController.createPost);

module.exports = router;
