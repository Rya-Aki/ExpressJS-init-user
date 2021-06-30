const UserService = require('../services/user.service')

exports.addUser = async (req, res) => {
    try {
        let newUser = await UserService.addUser(req.body)
        if(newUser.success === true) {
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
        if(logUser.success === true) {
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
        const decoded = jwt.decode(token, {complete: false});

        let userServiceRes = await UserService.unsetUser(decoded.id);

        res.status(userServiceRes.code);
        res.send(userServiceRes);

    } catch (err) {
        res.status(500)
        res.send({
            error: "La requête n'a pas abouti",
            devMessage: err,
            code: 500
        });
    }
}
