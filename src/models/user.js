const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
       
    },
    gender: {
        type: String,
       
    }

});
const User = mongoose.model('User', userSchema);
module.exports = User;