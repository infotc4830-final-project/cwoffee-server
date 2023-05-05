const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId() },
	content: { type: String, required: true },
})

module.exports = mongoose.model('reviews', reviewSchema)
