const express = require('express')
const app = express()
const cors = require('cors')
const reviewRouter = require('./routes/reviewRouter')
const menuRouter = require('./routes/menuRouter')
const TestController = require('./controllers/test')


app.use(cors(), express.json())

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	)
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PATCH, DELETE, OPTIONS'
// 	)
// 	next()
// })

app.get('/api/test', TestController.handleTest)

app.use('/api/reviews', reviewRouter)

app.use('/api/menu', menuRouter)

module.exports = app
