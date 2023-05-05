const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	orderId: { type: mongoose.ObjectId, required: true },
	uid: { type: mongoose.ObjectId },
	items: { type: String, required: true },
	totalPrice: { type: String, required: true },
})

module.exports = mongoose.model('orders', orderSchema)
