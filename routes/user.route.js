const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

//POST
router.post('/register', userController.register);
router.post('/login', userController.login);
//PUT
router.put('/verifyMail/:token', checkTokenMiddleware.validationToken, userController.verifyMail);
router.put('/update/login', checkTokenMiddleware.checkToken ,userController.updateLogin);
router.put('/update/email', checkTokenMiddleware.checkToken ,userController.updateEmail);
router.put('/update/password', checkTokenMiddleware.checkToken ,userController.updatePassword);
//GET
router.get('/me', checkTokenMiddleware.checkToken, userController.me)
//DELETE
router.delete('/delete', checkTokenMiddleware.checkToken, userController.deleteAccount)


module.exports = router;