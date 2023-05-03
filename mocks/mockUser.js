const mongoose = require('mongoose')
const mockUser = {
	userId: new mongoose.Types.ObjectId(),
	username: 'test_user',
	password: 'suuuuper_secure_password',
}

module.exports = { mockUser }
