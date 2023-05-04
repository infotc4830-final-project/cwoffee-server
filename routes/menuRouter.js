const router = require('express').Router()
const MenuController = require('../controllers/menu')
const jwt = require('jsonwebtoken')

router.get('/get-menu', MenuController.handleMenuGetAllItems)
router.post('/post-menu-item', MenuController.handleMenuPostOneItem)
router.post('/get-menu/secure', (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	if (!token)
		res.status(401).json({
			ok: false,
			message: 'Error, missing token input',
		})

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
	return MenuController.handleMenuGetAllItems(req, res)
})

module.exports = router
