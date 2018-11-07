const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
    fullname: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
	password: { type: String, unique: false, required: true }

})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
// userSchema.pre('save', function (next) {
// 	if (!this.password) {
// 		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
// 		next()
// 	} else {
// 		console.log('models/user.js Hash in pre save');
		
// 		this.password = this.hashPassword(this.password)
// 		console.log(this.password);
// 		next()
// 	}
// })

const User = mongoose.model('User', userSchema)
module.exports = User