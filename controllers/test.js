const MenuModel = require('../Models/menuSchema')
// const UserModel = require('../Models/userSchema')

const handleTest = async (req, res) => {
	return res.status(200).json({
		message: 'successful ' + req.method + ' request',
	})
}

module.exports = { handleTest }
