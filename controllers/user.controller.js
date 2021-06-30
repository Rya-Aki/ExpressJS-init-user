const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../controllers/jwt.controller');

exports.addUser = async (req, res) => {
    try {
        let newUser = await UserService.addUser(req.body)
        if (newUser.success === true) {
            res.status(201)
            res.send(newUser)
        } else {
            res.status(400)
            res.send(newUser)
        }
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
exports.connectUser = async (req, res) => {
    try {
        let logUser = await UserService.logUser(req.body)
        if (logUser.success === true) {
            res.status(201)
            res.send(logUser)
        } else {
            res.status(400)
            res.send(logUser)
        }
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        const decoded = jwt.decode(token, {complete: false})

        let userServiceRes = await UserService.unsetUser(decoded.id);
        res.status(200);
        res.send(userServiceRes);

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
exports.allUser = async (req, res) => {
    try {
        let allUser = await UserService.allUser();
        res.status(200);
        res.send(allUser);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.updateLogin = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        const decoded = jwt.decode(token, {complete: false});

        let userServiceRes = await UserService.updateLogin(decoded.id, req.body);

        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
exports.updateMail = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        const decoded = jwt.decode(token, {complete: false});

        let userServiceRes = await UserService.updateMail(decoded.id, req.body);

        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
exports.updateUserPass = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        const decoded = jwt.decode(token, {complete: false});

        let userServiceRes = await UserService.updateUserPass(decoded.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
exports.getMe = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        const decoded = jwt.decode(token, {complete: false});
        let userServiceRes = await UserService.getMe(decoded.id);
        res.status(200);
        res.send(userServiceRes);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        let userServiceRes = await UserService.deleteUserById(req.params.id);
        res.status(200);
        res.send(userServiceRes);

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.updateLoginAdmin = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateLogin(req.params.id , req.body);

        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

exports.updateMailAdmin = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateMail(req.params.id , req.body);

        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

exports.updateRole = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateRole(req.params.id , req.body);

        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
