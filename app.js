const express = require('express')
const app = express()
const { handleMenuGetAll, handleMenuGetOne } = require('./controllers/menu')

app.use(express.json())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	)
	next()
})

app.use('/api/test', (req, res, next) => {
	res.status(200).json({
		message: 'successful ' + req.method + ' request',
	})
})

// routes

module.exports = app
