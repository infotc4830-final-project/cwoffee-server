const app = require('./app')
const debug = require('debug')('node-angular')
const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config()

console.log('uri: ', process.env.DB_URI)
if (process.env.DB_URI) {
	mongoose
		.connect(process.env.DB_URI)
		.then(() => {
			console.log('Connected to database')
		})
		.catch((e) => {
			console.error('Connection Failed\n', e)
		})
} else {
	console.log('Missing DB_URI in .env')
}

const normalizePort = (val) => {
	var port = parseInt(val, 10)

	if (isNaN(port)) return val

	if (port >= 0) return port

	return false
}

const onError = (error) => {
	if (error.syscall !== 'listen') throw error

	const bind = typeof port == 'string' ? 'pipe ' + port : 'port ' + port
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			pricess.exit(1)
			break
		default:
			throw error
	}
}

const onListening = () => {
	const addr = server.address()
	const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port
	console.log('Listening on ' + bind)
}

const port = normalizePort(process.env.PORT || '5000')
app.set('port', port)

const server = http.createServer(app)
server.on('error', onError)
server.on('listening', onListening)
server.listen(port)
