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

exports.allUser = async () => {
    let users = await User.find({})
    return {
        success: true,
        users: users
    }
}

exports.updateLogin = async (id, change) => {
    const user = await User.findOne({_id: id})
    if (user.login === change.login) {
        return {
            success: true,
            message: "Aucun changement n'a été effectuer",
            login: change.login
        }
    }
    if (change.login.length < 2) {
        return {
            success: false,
            error: "Le nom d'utilisateur doit faire au moins 2 caractères !",
        }
    }
    await User.findOneAndUpdate({_id: id}, {login: change.login});
    return {
        success: true,
        message: "Votre Login a bien été modifier",
        login: change.login
    };

}

exports.updateMail = async (id, change) => {
    const user = await User.findOne({_id: id})
    if (user.email === change.email) {
        return {
            success: true,
            message: "Aucun changement n'a été effectuer",
            email: change.email
        }
    }
    if (!validateEmail(change.email)) {
        return {
            success: false,
            error: "Email invalide !"
        }
    }
    await User.findOneAndUpdate({_id: id}, {email: change.email});
    return {
        success: true,
        message: "Votre email a bien été modifier",
        email: change.email
    };
}
exports.updateUserPass = async (id, change) => {
    if (change.newPassword !== change.confPassword) {
        return {
            success: false,
            error: "les nouveaux mots de passes ne sont pas identique",
        }
    }
    let user = await User.findOne({_id: id})
    let valid = await bcrypt.compare(change.password, user.password)
    if (!valid) {
        return {
            success: false,
            error: "L'ancien mot de pass ne correspond pas !",
        };
    }
    change.confPassword = await bcrypt.hash(change.confPassword, 10);
    await User.findOneAndUpdate({_id: id}, {password: change.confPassword});
    return {
        success: true,
        message: "Le mot de passe a bien été changer"
    };
}
