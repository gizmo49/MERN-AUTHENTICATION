const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt-nodejs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
    fullname: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
	password: { type: String, unique: false, required: true }

})

const User = mongoose.model('User', userSchema)
module.exports = User