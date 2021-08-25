const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

//POST

//PUT

//GET
router.get('/user/all', checkTokenMiddleware.checkTokenAdmin, adminController.allUsers)
//DELETE


module.exports = router;