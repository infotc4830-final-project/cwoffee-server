const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId() },
	username: { type: String, required: true },
	password: { type: String, required: true },
})

module.exports = mongoose.model('users', userSchema)
