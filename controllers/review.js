const mongoose = require('mongoose')
const ReviewModel = require('../Models/reviewSchema')
const mockUser = require('../mocks/mockUser')

const handleReviewGetAll = async (req, res) => {
	let data
	try {
		data = await ReviewModel.find({})
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

const handleReviewGetByUserId = async (req, res) => {
	try {
		data = await ReviewModel.find({ userId: req.params.id })
		return res
			.status(200)
			.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed to query database' })
	}
}

const handleReviewGetByReviewId = async (req, res) => {
	try {
		data = await ReviewModel.find({
			reviewId: req.params.id,
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

const handleReviewGetByItemId = async (req, res, key) => {
	try {
		data = await ReviewModel.find({ menuItemId: req.params.id })
		return res
			.status(200)
			.json({ ok: true, message: 'success', data: data })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed to query database' })
	}
}

const handleReviewPost = async (req, res) => {
	if (!req.body)
		return res
			.status(400)
			.json({ message: 'invalid request or request body' })

	try {
		const Review = new ReviewModel({
			userId: mockUser.userId,
			username: mockUser.username,
			title: req.body.title,
			content: req.body.content,
			menuItemId: mongoose.Types.ObjectId(),
		})
		const saveResult = await Review.save()
		console.log(saveResult)

		return res.status(200).json({ ok: true, message: 'success' })
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'failed test connection' })
	}
}

const handleReviewPatch = async (req, res) => {}

const handleReviewDelete = async (req, res) => {}

module.exports = {
	handleReviewGetAll,
	handleReviewGetByItemId,
	handleReviewGetByReviewId,
	handleReviewGetByUserId,
	handleReviewPost,
	handleReviewPatch,
	handleReviewDelete,
}
