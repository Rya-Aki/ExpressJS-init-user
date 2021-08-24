const User = require('../models/userModel');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// register validation
exports.emailValidation = async (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.loginValidation = async (login) => {
    return login.length > 2 && login.length < 255;
}
exports.passwordValidation = async (password, confirmation) => {
    if (password === confirmation) {
        return confirmation.length > 6 && confirmation.length < 255
    } else return false
}
exports.emailUnique = async (email) => {
    return await User.findOne({email: email}) === null;
}
exports.loginUnique = async (login) => {
    return await User.findOne({login: login}) === null;
}

// mailling
exports.sendMailVerification = async (email, login) => {
    const token = jwt.sign({
        email: email,
    }, process.env.SECRET, {expiresIn: '72 hours'})
    const mailOptions = {
        from: "Bod'Health",
        to: email,
        subject: 'Email de validation',
        html: "<h3>Bonjour " + login + ",</h3><br>" +
            "<p>Nous devons vérifier votre adresse e-mail avant que vous puissiez accéder à votre profil, Bod'Health. <br>" +
            "<a href=\'"+ process.env.FRONT_URL + token + "\'>Vérifiez mon adresse e-mail .</a></p> <br>" +
            "<p>Merci !</p>" +
            "<p><b><i>L'équipe de Bod'Health</i></b></p>"
    };
    await transporter.sendMail(mailOptions)
}
