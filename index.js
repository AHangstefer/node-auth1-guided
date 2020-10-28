const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const usersRouter = require("./users/users-router")
const session = require("express-session") //added after installing

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({ //added after installing and requiring
	resave: false, // avoid creating sessions that have not changed
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: "keep it secret, keep it safe" //required for this import to work

}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
