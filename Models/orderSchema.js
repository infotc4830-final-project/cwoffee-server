const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	orderId: { type: mongoose.ObjectId, required: true },
	uid: { type: mongoose.ObjectId, required: true },
	items: { type: [mongoose.ObjectId], required: true },
	totalPrice: { type: String, required: true },
})

module.exports = mongoose.model('orders', orderSchema)
