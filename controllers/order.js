const mongoose = require('mongoose')
const OrderModel = require('../Models/orderSchema')
const mockUser = require('../mocks/mockUser')

const handleOrderGetAll = async (req, res) => {
	let data
	try {
		data = await OrderModel.find({})
		return res
			.status(200)
			.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		console.error(e)
		return res
			.status(500)
			.json({ ok: false, message: 'failed test connection' })
	}
}

const handleOrderGetByUserId = async (req, res) => {
	try {
		data = await OrderModel.find({ uid: req.params.uid })
		return res
			.status(200)
			.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed to query database' })
	}
}

const handleOrderGetByOrderId = async (req, res) => {
	try {
		data = await OrderModel.find({
			orderId: req.params.orderId,
		})
		return res
			.status(200)
			.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed to query database' })
	}
}

const handleOrderPost = async (req, res) => {
	try {
		const Order = new OrderModel({
            orderId: req.body.orderId
                ? req.body.orderId 
                : new mongoose.Types.ObjectId(),
            uid:  req.body.uid ? req.body.uid : mockUser.userId,
            items: req.body.items ? req.body.items : new [mongoose.Types.ObjectId()],
            totalPrice: req.body.totalPrice,
		})
		await Order.save()
		return res.status(201).json({ ok: true, message: 'success' })
	} catch (e) {
		console.log('failed')
		console.error(e)
		return res
			.status(500)
			.json({ ok: false, message: 'failed test connection' })
	}
}

const handleOrderPatch = async (req, res) => {
	try {
		const orderId = req.body.orderId
		const uid = req.body.uid
		const items = req.body.items
		const totalPrice = req.body.totalPrice

		if (!orderId || !uid || !items || !totalPrice) {
			return res
				.status(400)
				.json({ ok: false, message: 'missing inputs' })
		}

		const order = await OrderModel.findOne({ orderId: orderId })
		console.log('order: ', order)

		await OrderModel.findByIdAndUpdate(orderId, {
			uid,
            items,
            totalPrice
		})
		return res
			.status(201)
			.json({ ok: true, message: 'successfully updated' })
	} catch (e) {
		console.log(e)
		return res.status(500).json({ ok: false, message: 'failed to update' })
	}
}

const handleOrderDelete = async (req, res) => {
	if (!req.body.orderId) {
		return res.status(400).json({ ok: false, message: 'missing orderId input' })
	}
	try {
		await OrderModel.findByIdAndDelete({ orderId: req.body.orderId })
		return res
			.status(202)
			.json({ ok: true, message: 'successfully deleted order' })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ ok: false, message: 'failed to delete' })
	}
}

module.exports = {
	handleOrderGetAll,
	handleOrderGetByOrderId,
	handleOrderGetByUserId,
	handleOrderPost,
	handleOrderPatch,
	handleOrderDelete,
}