const User = require('../models/userModel');
require('dotenv').config();
const bcrypt = require('bcrypt')
const validation = require('../validation/validation')
const jwt = require("jsonwebtoken");

exports.register = async (body) => {
    try {
        switch (false) {
            case await validation.emailValidation(body.email) :
                return {success: false, error: "invalid email"}
            case await validation.loginValidation(body.login) :
                return {success: false, error: "invalid login"}
            case await validation.passwordValidation(body.password, body.confirmation) :
                return {success: false, error: "invalid password"}
            case await validation.emailUnique(body.email) :
                return {success: false, error: "no unique email"}
            case await validation.loginUnique(body.login) :
                return {success: false, error: "no unique login"}
            default:
                let user = new User({
                    createdAt: new Date(),
                    updateAt: new Date(),
                    admin: false,
                    email: body.email,
                    login: body.login,
                    password: await bcrypt.hash(body.password, 10),
                    profil: {},
                    verified: false
                });
                await user.save();
                await validation.sendMailVerification(body.email, body.login)
                return {success: true};
        }
    } catch (error) {
        throw error;
    }
}
exports.verifyMail = async (token) => {
    try {
        return await User.findOneAndUpdate({email: token.email}, {verified: true, updateAt: new Date()}) !== null ? {success: true} : {success: false};
    } catch (error) {
        throw error;
    }
}
exports.login = async (body) => {
    try {
        const user = await User.findOne({login: body.login})
        if (!user) {
            return {success: false, error: "incorrect log"}
        } else {
            switch (false) {
                case await bcrypt.compare(body.password, user.password) :
                    return {success: false, error: "incorrect log"}
                case user.verified:
                    return {success: false, error: "email not verified"}
                default :
                    const token = jwt.sign({
                        id: user._id,
                        admin: user.admin
                    }, process.env.SECRET, {expiresIn: '24 hours'})
                    return {
                        success: true,
                        token: token,
                        admin: user.admin,
                        login: user.login
                    };
            }
        }
    } catch (error) {
        throw error;
    }
}

exports.updateEmail = async (id, body) => {
    try {
        switch (false) {
            case await validation.emailValidation(body.email) :
                return {success: false, error: "invalid email"}
            case await validation.emailUnique(body.email) :
                return {success: false, error: "no unique email"}
            default :
                await User.updateOne({_id: id}, {email: body.email, updateAt: new Date()});
                return {success: true, email: body.email};
        }
    } catch (error) {
        throw error
    }

}
exports.updateLogin = async (id, body) => {
    try {
        switch (false) {
            case await validation.loginValidation(body.login) :
                return {success: false, error: "invalid login"}
            case await validation.loginUnique(body.login) :
                return {success: false, error: "no unique login"}
            default :
                await User.updateOne({_id: id}, {login: body.login, updateAt: new Date()});
                return {success: true, login: body.login};
        }
    } catch (error) {
        throw error
    }
}
exports.updatePassword = async (id, body) => {
    try {
        let user = await User.findOne({_id: id})
        switch (false) {
            case await validation.passwordValidation(body.new, body.confirmation) :
                return {success: false, error: "invalid password"};
            case await bcrypt.compare(body.password, user.password) :
                return {success: false, error: "incorrect log"}
            default :
                await User.updateOne({_id: id}, {password: await bcrypt.hash(body.new, 10), updateAt: new Date()});
                return {success: true}
        }
    } catch (error) {
        throw error
    }
}
exports.deleteAccount = async (id) => {
    try {
        await User.deleteOne({_id: id});
        return {
            success: true
        };
    } catch (error) {
        throw error
    }
}
exports.me = async (id) => {
    try {
        return {
            success: true,
            user: await User.findOne({_id: id})
        }
    } catch (error) {
        throw error
    }
}