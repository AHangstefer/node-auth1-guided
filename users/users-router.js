const express = require("express")
const Users = require("./users-model")
const bcrypt =require("bcryptjs") //added this after installing
const {restrict} =require("./users-middleware")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/users", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			//this will hash password(10x) and store it instead of plain text
			password: await bcrypt.hash(password, 10),
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
		//added to make sure password works (matches hash)
		const passwordValid = await bcrypt.compare(password, user.password)
		// if password is incorrect, invalid credentials
		if (!passwordValid){
			return res.status(401).json({
				message: "invalid credentials"
			})
		}
		req.session.user = user //added after adding session
		
		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router
