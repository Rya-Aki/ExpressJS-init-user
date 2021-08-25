const UserService = require('../services/user.service')

exports.allUsers = async (req, res) => {
    try {
        res.status(200);
        res.send(await UserService.allUsers(req.user.id));
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}