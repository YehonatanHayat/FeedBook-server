const { request } = require('express');
const mongoose = require('mongoose');
const UserController = require('../controllers/userController');




router.post('/', UserController.createUser);
router.get('/:email', UserController.getUserByUsername);
module.exports = router;
