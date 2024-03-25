const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST route to create a new user
router.post('/', UserController.createUser);
module.exports = router;
