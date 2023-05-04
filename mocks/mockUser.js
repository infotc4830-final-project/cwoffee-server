const mongoose = require('mongoose')
const mockUser = {
	_id: new mongoose.Types.ObjectId(),
	username: 'username1',
	password: 'password1',
}

module.exports = { mockUser }
