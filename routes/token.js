const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');
console.log('token routes.js');
router.post('/', tokenController.login);

module.exports = router;
