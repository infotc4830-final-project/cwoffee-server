const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId },
	name: { type: String },
	price: { type: String },
	description: { type: String },
	options: [
		{
			style: { type: String },
			price: { type: String },
		},
	],
	type: { type: String },
	category: { type: String },
})

module.exports = mongoose.model('menus', menuSchema)
