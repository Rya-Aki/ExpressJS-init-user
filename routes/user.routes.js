const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.addUser)
router.post('/login', userController.connectUser)
router.delete('/', userController.deleteUser)

module.exports = router;
