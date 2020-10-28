const usersModel = require("./users-model")
const bcrypt = require("bcryptjs")
const users = require("./users-model")

function restrict() {
	// Create a middleware function that restricts routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req, res, next) => {
		try{
			// const {username, password} = req.headers
			// //make sure they're not empty
			// if (!username || !password){
			// 	return res.sttus(401).json({
			// 		message: "invalid credentials"
			// 	})
			// }

			// const user = await Users.findBy({username}).first()
			// if (!user) {
			// 	return res.sttus(401).json({
			// 		message: "invalid credentials"
			// 	})
			// }

			// const passwordValid = await bcrypt.compare(password, user.password)
			// if (!passwordValid){
			// 	return res.sttus(401).json({
			// 		message: "invalid credentials"
			// 	})
			// }
			if (!req.session || !req.session.user){
				return res.status(401).json({
					message: "invalid credentials"
				})
			}

		}
		catch(err){
			next(err)
		}
	}
}

module.exports = {
	restrict,
}