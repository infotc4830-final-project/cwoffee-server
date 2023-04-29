const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId },
	name: { type: String },
	type: { type: String, enum: ['DRINK', 'FOOD'], default: 'DRINK' },
})

module.exports = mongoose.model('menus', menuSchema)
