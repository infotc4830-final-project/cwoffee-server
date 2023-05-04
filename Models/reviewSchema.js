const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId() },
	username: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	menuItemId: { type: mongoose.ObjectId },
})

module.exports = mongoose.model('reviews', reviewSchema)
