const router = require('express').Router()
const ReviewController = require('../controllers/review')

router.get('/get-all', ReviewController.handleReviewGetAll)
router.get('/by-user-id', ReviewController.handleReviewGetByUserId)
router.get('/by-review-id', ReviewController.handleReviewGetByReviewId)
router.get('/by-menu-item-id', ReviewController.handleReviewGetByItemId)
router.post('/create-new', ReviewController.handleReviewPost)
router.patch('/update', ReviewController.handleReviewPatch)
router.delete('/delete', ReviewController.handleReviewDelete)

module.exports = router
