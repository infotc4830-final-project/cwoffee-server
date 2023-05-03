const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	userId: { type: mongoose.ObjectId },
	username: { type: String, required: true },
	password: { type: String, required: true },
})

module.exports = mongoose.model('users', userSchema)
