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
	try {
		const Review = new ReviewModel({
			username: req.body.username ? req.body.username : mockUser.username,
			title: req.body.title,
			content: req.body.content,
			menuItemId: req.body.menuItemId
				? req.body.menuItemId
				: new mongoose.Types.ObjectId(),
		})
		await Review.save()
		return res.status(201).json({ ok: true, message: 'success' })
	} catch (e) {
		console.log('failed')
		console.error(e)
		return res
			.status(500)
			.json({ ok: false, message: 'failed test connection' })
	}
}

const handleReviewPatch = async (req, res) => {
	try {
		const _id = req.body._id
		const username = req.body.username
		const title = req.body.title
		const content = req.body.content
		const menuItemId = req.body.menuItemId

		if (!_id || !userId || !username || !title || !content || !menuItemId) {
			return res
				.status(400)
				.json({ ok: false, message: 'missing inputs' })
		}

		const review = await ReviewModel.findOne({ _id: _id })
		console.log('review: ', review)

		await ReviewModel.findByIdAndUpdate(_id, {
			username,
			title,
			content,
			menuItemId,
		})
		return res
			.status(201)
			.json({ ok: true, message: 'successfully updated' })
	} catch (e) {
		console.log(e)
		return res.status(500).json({ ok: false, message: 'failed to update' })
	}
}

const handleReviewDelete = async (req, res) => {
	if (!req.body._id) {
		return res.status(400).json({ ok: false, message: 'missing _id input' })
	}
	try {
		await ReviewModel.findByIdAndDelete({ _id: req.body._id })
		return res
			.status(202)
			.json({ ok: true, message: 'successfully deleted review' })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ ok: false, message: 'failed to delete' })
	}
}

module.exports = {
	handleReviewGetAll,
	handleReviewGetByItemId,
	handleReviewGetByReviewId,
	handleReviewPost,
	handleReviewPatch,
	handleReviewDelete,
}
