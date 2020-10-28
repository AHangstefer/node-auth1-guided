const crypto = require("crypto")

const rounds = 10 // how many times we hash the hash.
				// changed from 1, to 10, to 1000 to 10000, 1000000
				// store the 1000000 hash so they can't create a rainbow table
const value = "hello world"

console.time("hash time")

let hash = value
for (let i = 0; i < rounds; i++) {
	hash = crypto
		.createHash("md5")
		.update(hash)
		.digest("hex")
}

console.timeEnd("hash time")
console.log(`result of ${rounds} MD5 hashes: ${hash}`)
