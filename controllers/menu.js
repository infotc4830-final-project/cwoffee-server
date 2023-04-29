const MenuModel = require('../Models/menuSchema')

const handleMenuGetAll = async (req, res) => {
	let data
	try {
		data = await MenuModel.find({})
	} catch (e) {
		return res.status(500).json({ message: 'failed test connection' })
	}

	return res.status(200).json({ message: 'success', data: data })
}

const handleMenuGetOne = async (req, res) => {
	if (!req.body.name)
		return res.status(400).json({ message: 'missing inputs' })

	let data
	try {
		data = await MenuModel.find({ name: req.body.name })
	} catch (e) {
		return res.status(500).json({ message: 'failed test connection' })
	}

	return res.status(200).json({ message: 'success', data: data })
}

// const handleMenuPostOne = async (req, res) => {

// 	// if (!req.body.name)
// 	// 	return res.status(400).json({ message: 'missing inputs' })

// 	let data
// 	try {
// 		data = await MenuModel.find({ name: req.body.name })
// 	} catch (e) {
// 		return res.status(500).json({ message: 'failed test connection' })
// 	}

// 	return res.status(200).json({ message: 'success', data: data })
// }

module.exports = {
	handleMenuGetAll,
	handleMenuGetOne,
	// handleMenuPostOne,
}
