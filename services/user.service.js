const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET = 'RyaSuiteSecretKey1298456';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.addUser = async (form) => {
    if (form.password !== form.confPassword) {
        return {
            success: false,
            error: "Les mots de passes ne sont pas identiques"
        }
    }
    if (form.login.length < 2) {
        return {
            success: false,
            error: "Le nom d'utilisateur doit faire plus de 2 caractères !"
        }
    }
    if (!validateEmail(form.email)) {
        return {
            success: false,
            error: "Email invalide !"
        }
    }
    form.password = await bcrypt.hash(form.password, 10);

    const user = new User({createdAt: new Date(), updateAt: new Date(), admin: false});
    Object.assign(user, form);
    await user.save();
    return {
        success: true
    };
}

exports.logUser = async (form) => {
    const user = await User.findOne({login: form.login})
    if (!user) {
        return {
            success: false,
            error: "Vos identifiants sont incorect !"
        }
    } else {
        let valid = await bcrypt.compare(form.password, user.password)
        if (!valid) {
            return {
                success: false,
                error: "Vos identifiants sont incorect !"
            }
        } else {
            const token = jwt.sign({
                id: user._id,
                login: user.login,
                email: user.email
            }, SECRET, {expiresIn: '24 hours'})
            return {
                success: true,
                token: token,
                login: user.login,
                nickName: user.email,
            };
        }
    }
}

exports.unsetUser = async (id) => {
    await User.deleteOne({_id: id});
    return {
        success: true
    };
}
