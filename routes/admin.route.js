const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

//POST
router.post('/user/account', checkTokenMiddleware.checkTokenAdmin, adminController.registerAdmin);
router.post('/user/search', checkTokenMiddleware.checkTokenAdmin, adminController.searchUserByLoginOrEmail);
//PUT
router.put('/user/update/email/:id', checkTokenMiddleware.checkTokenAdmin, adminController.updateUserEmail);
router.put('/user/update/login/:id', checkTokenMiddleware.checkTokenAdmin, adminController.updateUserLogin);
router.put('/user/update/role/:id', checkTokenMiddleware.checkTokenAdmin, adminController.updateUserRole);
//GET
router.get('/user/all', checkTokenMiddleware.checkTokenAdmin, adminController.allUsers);
router.get('/user/:id', checkTokenMiddleware.checkTokenAdmin, adminController.oneUser);
//DELETE
router.delete('/user/delete/:id', checkTokenMiddleware.checkToken, adminController.deleteUserAccount)


module.exports = router;