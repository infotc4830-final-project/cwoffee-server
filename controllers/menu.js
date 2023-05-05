const MenuModel = require('../Models/menuSchema')

const handleMenuGetAllItems = async (req, res) => {
	let data
	try {
		data = await MenuModel.find({})
	} catch (e) {
		return res.status(500).json({ message: 'failed test connection' })
	}

	return res.json({ message: 'success', data: data })
}

const handleMenuPostOneItem = async (req, res) => {

	if (!req.body.name)
		return res.json({ message: 'missing inputs' })

	let data
	try {
		data = await MenuModel.find({ name: req.body.name })
	} catch (e) {
		return res.status(500).json({ message: 'failed test connection' })
	}

	return res..json({ message: 'success', data: data })
}

module.exports = {
	handleMenuGetAllItems,
	handleMenuPostOneItem
}
