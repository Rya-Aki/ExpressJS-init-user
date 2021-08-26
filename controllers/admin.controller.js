const UserService = require('../services/user.service')

exports.allUsers = async (req, res) => {
    try {
        res.status(200);
        res.send(await UserService.allUsers(req.user.id));
    } catch (error) {
        res.status(400);
        res.send({success: false, error});
    }
}
exports.oneUser = async (req, res) => {
    try {
        res.status(200);
        res.send(await UserService.me(req.params.id));
    } catch (error) {
        res.status(400);
        res.send({success: false, error});
    }
}
exports.updateUserEmail = async (req, res) => {
    try {
        let resService = await UserService.updateEmail(req.params.id, req.body);
        if (resService.success) {
            res.status(200);
            res.send(resService);
        } else {
            res.status(400);
            res.send(resService);
        }
    } catch (error) {
        res.status(400);
        res.send({success: false, error});
    }
}
exports.updateUserLogin = async (req, res) => {
    try {
        let resService = await UserService.updateLogin(req.params.id, req.body);
        if (resService.success) {
            res.status(200);
            res.send(resService);
        } else {
            res.status(400);
            res.send(resService);
        }
    } catch (error) {
        res.status(400);
        res.send({success: false, error});
    }
}
exports.updateUserRole = async (req, res) => {
    try {
        let resService = await UserService.updateRole(req.params.id, req.body);
        if (resService.success) {
            res.status(200);
            res.send(resService);
        } else {
            res.status(400);
            res.send(resService);
        }
    } catch (error) {
        res.status(400);
        res.send({success: false, error});
    }
}
exports.deleteUserAccount = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.deleteAccount(req.params.id)
        );
    } catch (error) {
        res.status(400)
        res.send({success: false, error})
    }
}
exports.registerAdmin = async (req, res) => {
    try {
        let resService = await UserService.register(req.body, true)
        if (resService.success === true) {
            res.status(201)
            res.send(resService)
        } else {
            res.status(400)
            res.send(resService)
        }
    } catch (error) {
        res.status(400)
        res.send({success: false, error})
    }
}
exports.searchUserByLoginOrEmail = async (req, res) => {
    try{
        res.status(200);
        res.send(await UserService.searchUserByLoginOrEmail(req.body.search));
    } catch (error) {
        res.status(400)
        res.send({success: false, error})
    }
}