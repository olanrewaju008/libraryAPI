const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        require:true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true
    },

    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel