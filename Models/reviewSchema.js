const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId },
	userId: { type: mongoose.ObjectId, required: false },
	username: { type: String, required: false },
	title: { type: String, required: false },
	content: { type: String, required: false },
	// itemOrdered: { type: String, required: false },
	menuItemId: { type: mongoose.ObjectId, required: false },
})

module.exports = mongoose.model('reviews', reviewSchema)
