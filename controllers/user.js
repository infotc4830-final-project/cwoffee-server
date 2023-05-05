const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userSchema')
const { mockUser } = require('../mocks/mockUser')
const bcrypt = require('bcrypt')

const handleUserLogin = async (req, res) => {
	const { username, password } = req.body

	let existingUser
	try {
		existingUser = await UserModel.findOne({
			username: username,
		})
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error connecting to database' })
	}
	console.log('existingUser: ', existingUser)
	console.log('existingUser type: ', typeof existingUser)
	if (!existingUser || existingUser == {} || existingUser == [])
		return res.json({ ok: false, message: 'Username not found' })

	let samePassword
	try {
		samePassword = await new Promise((resolve, reject) => {
			bcrypt.compare(password, existingUser.password, (err, result) => {
				if (err) reject(err)
				resolve(result)
			})
		})
	} catch (e) {
		console.log('bcrypt failure')
		res.status(500).json({
			ok: false,
			message: 'failed to compare bcrypt passwords',
		})
		process.exit(1)
	}
	console.log('samePassword: ', samePassword)
	if (!samePassword)
		return res.json({ ok: false, message: 'Incorrect password' })

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
		existingUser = await UserModel.findOne({
			username: username,
		})
	} catch (e) {
		return res
			.status(500)
			.json({ ok: false, message: 'Error connecting to database' })
	}

	if (existingUser)
		return res.json({ ok: false, message: 'username already exists' })

	// let newUser
	const hashedPassword = await new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) reject(err)
			else resolve(hash)
		})
	})

	const newUser = UserModel({
		username: username,
		password: hashedPassword,
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
