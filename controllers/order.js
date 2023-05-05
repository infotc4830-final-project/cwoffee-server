const mongoose = require('mongoose')
const OrderModel = require('../Models/orderSchema')

const handleOrderGetAll = async (req, res) => {
	let data
	try {
		data = await OrderModel.find({})
		return res.json({ ok: true, message: 'success', data: data })
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
		return res.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed to query database' })
	}
}

const handleOrderGetByOrderId = async (req, res) => {
	try {
		data = await OrderModel.find({
			_id: req.params._id,
		})
		return res.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed to query database' })
	}
}

const handleOrderPost = async (req, res) => {
	if (!req.body.items || req.body.items == [])
		return res.json({ ok: false, message: 'missing an items list' })

	try {
		const Order = new OrderModel({
			_id: new mongoose.Types.ObjectId(),
			items: req.body.items ? req.body.items : [],
			totalPrice: req.body.totalPrice,
		})
		await Order.save()
		return res.json({ ok: true, message: 'success' })
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
		const _id = req.body._id
		const items = req.body.items
		const totalPrice = req.body.totalPrice

		if (!_id || !items || !totalPrice) {
			return res.json({ ok: false, message: 'missing inputs' })
		}

		const order = await OrderModel.findOne({ _id: _id })
		console.log('order: ', order)

		await OrderModel.findByIdAndUpdate(_id, {
			items,
			totalPrice,
		})
		return res.json({ ok: true, message: 'successfully updated' })
	} catch (e) {
		console.log(e)
		return res.status(500).json({ ok: false, message: 'failed to update' })
	}
}

const handleOrderDelete = async (req, res) => {
	if (!req.body._id) {
		return res.json({ ok: false, message: 'missing orderId input' })
	}
	try {
		await OrderModel.findByIdAndDelete({ _id: req.body._id })
		return res.json({ ok: true, message: 'successfully deleted order' })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ ok: false, message: 'failed to delete' })
	}
}

module.exports = {
	handleOrderGetAll,
	handleOrderGetByOrderId,
	handleOrderPost,
	handleOrderPatch,
	handleOrderDelete,
}
