const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


// POST route to create a new user
router.post('/', UserController.createUser);


// GET route to fetch user data by username
router.get('/:email', UserController.getUserByUsername);
module.exports = router;
