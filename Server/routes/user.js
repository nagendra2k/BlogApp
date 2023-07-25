const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const userController = require('../controllers/user');

router.post('/editprofile', requireLogin, userController.edituser);

module.exports = router;