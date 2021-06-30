const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', userController.addUser)
router.delete('/' , checkTokenMiddleware.checkToken, userController.deleteUser)

router.put('/login', checkTokenMiddleware.checkToken, userController.updateLogin);
router.put('/email', checkTokenMiddleware.checkToken, userController.updateMail);
router.put('/password', checkTokenMiddleware.checkToken, userController.updateUserPass);

router.post('/login', userController.connectUser)
router.get('/all', checkTokenMiddleware.checkTokenAdmin ,userController.allUser)

module.exports = router;
