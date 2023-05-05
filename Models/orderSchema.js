const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	_id: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId() },
	uid: { type: mongoose.ObjectId },
	items: { type: String, required: true },
	totalPrice: { type: String, required: true },
})

module.exports = mongoose.model('orders', orderSchema)
