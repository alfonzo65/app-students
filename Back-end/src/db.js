const { createPool } = require('mysql2/promise')
const bcrypt = require('bcrypt')

const conexion = createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD
})

// message
if( conexion )
	console.log("DB is connected")
else
	console.log("Error BD conexion")

function comparar( password , hash ){
	return compare(password, hash);
}

async function encryptar( password ){
	const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
	const hash = await bcrypt.hash( password, salt);
	return hash;
}

module.exports = {
	conexion,
	comparar,
	encryptar
}