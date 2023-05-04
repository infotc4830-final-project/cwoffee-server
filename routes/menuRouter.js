const router = require('express').Router()
const MenuController = require('../controllers/menu')

router.get('/get-menu', MenuController.handleMenuGetAllItems)
router.post('/post-menu-item', MenuController.handleMenuPostOneItem)

module.exports = router
