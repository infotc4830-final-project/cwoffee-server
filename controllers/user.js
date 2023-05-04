const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userSchema')
const { mockUser } = require('../mocks/mockUser')

const handleUserLogin = async (req, res) => {
	const { username, password } = req.body

	let existingUser
	try {
		existingUser = await UserModel.find({
			username: username,
		})
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error connecting to database' })
	}

	if (!existingUser || existingUser.password != password)
		return res
			.status(401)
			.json({ ok: false, message: 'Incorrect Login Information' })

	let token
	try {
		token = jwt.sign(
			{
				uid: existingUser._id,
				username: existingUser.username,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: '1h' }
		)
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error generating token' })
	}
	return res.status(200).json({
		ok: true,
		message: 'success',
		data: {
			uid: existingUser._id,
			username: existingUser.username,
			token: token,
		},
	})
}

const handleUserRegister = async (req, res) => {
	const { username, password } = req.body

	let existingUser
	try {
		existingUser = await UserModel.find({
			username: username,
		})
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error connecting to database' })
	}
	if (existingUser)
		return res.json({ ok: false, message: 'username already exists' })

	const newUser = UserModel({
		username: username ? username : mockUser.username,
		password: password ? password : mockUser.password,
	})
	try {
		await newUser.save()
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error saving new user to database' })
	}

	let token
	try {
		token = jwt.sign(
			{ uid: newUser._id, username: newUser.username },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: '1h' }
		)
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error generating token' })
	}

	return res.status(201).json({
		ok: true,
		message: 'successful creation of user',
		data: {
			uid: newUser._id,
			username: newUser.username,
			token: token,
		},
	})
}

module.exports = {
	handleUserLogin,
	handleUserRegister,
}
