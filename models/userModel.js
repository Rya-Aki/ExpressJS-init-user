const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsersSchema  = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        required: true
    },
    updateAt : {
        type: Date,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    profil: [{
        size: Number,
        weight: Number,
        birthday: Date,
        gender: String,
    }]
});

UsersSchema.plugin(uniqueValidator);

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
