const jwt = require('jsonwebtoken');
const SECRET = "RyaSuiteSecretKey1298456";
const User = require('../models/userModel');

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

exports.extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

exports.checkToken = async function (req, res, next) {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Présence d'un token
    if (!token) {
        return res.status(401).json({message: 'Error. Need a token'})
    }
    // Véracité du token
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            res.status(401).json({message: 'Error. Bad token'})
        } else {
            req.user = jwt.decode(token, {complete: false})
            return next()
        }
    })
}

exports.checkTokenAdmin = async function (req, res, next) {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({message: 'Error. Need a token'})
    }
    // Véracité du token
    jwt.verify(token, SECRET, async (err) => {
        if (err) {
            res.status(401).json({message: 'Error. Bad token'})
        } else {
            req.user = jwt.decode(token, {complete: false});
            const user = await User.findOne({_id: req.user.id});
            if (user.admin) {
                return next()
            } else {
                res.status(400).json({message: 'Error. Bad admin token'})
            }
        }
    })
}

exports.validationToken = async function (req, res, next) {
    // Récupération du token
    jwt.verify(req.params.token, process.env.SECRET, (err) => {
        if (err) {
            res.status(401).json({message: 'Error. Bad token'})
        } else {
            req.user = jwt.decode(req.params.token, {complete: false});
            return next()
        }
    })

}