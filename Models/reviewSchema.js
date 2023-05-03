const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
	userId: { type: mongoose.ObjectId, required: true },
	username: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
    item_ordered: { type: String, required: true }
})

module.exports = mongoose.model('reviews', reviewSchema)
