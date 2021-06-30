const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', userController.addUser)
router.post('/login', userController.connectUser)

router.get('/', checkTokenMiddleware.checkToken, userController.getMe)

router.delete('/' , checkTokenMiddleware.checkToken, userController.deleteUser)

router.put('/login', checkTokenMiddleware.checkToken, userController.updateLogin);
router.put('/email', checkTokenMiddleware.checkToken, userController.updateMail);
router.put('/password', checkTokenMiddleware.checkToken, userController.updateUserPass);

//admin user routes

router.get('/all', checkTokenMiddleware.checkTokenAdmin ,userController.allUser)
router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, userController.deleteUserById)
router.put('/login/:id', checkTokenMiddleware.checkTokenAdmin, userController.updateLoginAdmin);
router.put('/email/:id', checkTokenMiddleware.checkTokenAdmin, userController.updateMailAdmin);
router.put('/admin/:id', checkTokenMiddleware.checkTokenAdmin, userController.updateRole);

module.exports = router;
