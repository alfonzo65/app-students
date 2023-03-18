const { createPool } = require('mysql2/promise')


const conexion = createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD
})

if( conexion )
	console.log("DB is connected")
else
	console.log("Error BD conexion")

module.exports = conexion