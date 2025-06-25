const express = require('express');
const router = express.Router();
const auth = require('../auth');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.getProfile);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
