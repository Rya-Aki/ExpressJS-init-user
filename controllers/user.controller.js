const UserService = require('../services/user.service')

exports.register = async (req, res) => {
    try {
        let resService = await UserService.register(req.body)
        if (resService.success === true) {
            res.status(201)
            res.send(resService)
        } else {
            res.status(400)
            res.send(resService)
        }
    } catch (error) {
        res.status(403)
        res.send({success: false, error})
    }
}
exports.verifyMail = async (req, res) => {
    try {
        res.status(201)
        res.send(await UserService.verifyMail(req.user))
    } catch (error) {
        res.status(403)
        res.send({success: false, error})
    }
}
exports.login = async (req, res) => {
    try {
        let logUser = await UserService.login(req.body)
        if (logUser.success === true) {
            res.status(201)
            res.send(logUser)
        } else {
            res.status(400)
            res.send(logUser)
        }
    } catch (error) {
        res.status(400)
        res.send({success: false, error})
    }
}
exports.updateLogin = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateLogin(req.user.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updateEmail = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateEmail(req.user.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updatePassword = async (req, res) => {
    try {
        let userServiceRes = await UserService.updatePassword(req.user.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.deleteAccount = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.deleteAccount(req.user.id)
        );
    } catch (errors) {
        res.status(400)
        res.send({success: false, errors})
    }
}
exports.me = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.me(req.user.id)
        );
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}