const MenuModel = require('../Models/menuSchema')
// const UserModel = require('../Models/userSchema')

const handleTest = async (req, res) => {
	let data
	try {
		data = await MenuModel.find({})
	} catch (e) {
		return res.status(500).json({ message: 'failed test connection' })
	}
	return res.status(200).json({ message: 'success', data: data })
}

module.exports = handleTest
