const router = require('express').Router()
const OrderController = require('../controllers/order')

router.get('/get-all-orders', OrderController.handleOrderGetAll)
router.get('/get-order-by-id', OrderController.handleOrderGetByOrderId)
router.post('/new-order', OrderController.handleOrderPost)
router.patch('/update-order', OrderController.handleOrderPatch)
router.delete('/delete-order', OrderController.handleOrderDelete)

module.exports = router
