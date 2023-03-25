const { encryptar, conexion, comparar } = require("../db.js")
const jwt = require('jsonwebtoken');

const students = {};

students.registerNewUser = async (req,res) =>{
	try {
		const { id, firstName, lastName, email, age, country, state } = req.body;

		if( id && firstName && lastName && email && age && country && state ){
			await conexion.query("INSERT INTO student VALUES (?, ?, ?, ?, ?)", 
			[id,firstName,lastName,email,age])
			await conexion.query("INSERT INTO location VALUES (?, ?, ?)", 
				[id, country, state])
			return res.status(201).json({message:"add student!", success:1})
		}else{
			return res.status(409).json({ message: "Data insufficient or Invalid Data"})
		}
		
	} catch(e) {
		return res.status(500).json({ message: "Internal server error " + e.message })
	}
}

students.newUser = async (req,res) =>{
	try {
		const { username, password, id_student } = req.body
		
		if( username && password && id_student ){
			const [ data ]= await conexion.execute("SELECT id_student FROM student WHERE id_student = (?)",
				[id_student])
			if( data.length == 0 ){
				return res.status(409).send({message:"You need register your information to create an user"})
			} else {

				// check if exist the User -> Id in the database
				const [ user ] = await conexion.query("SELECT userId FROM users WHERE userId = (?)", username);
				
				if(user[0])
					return res.status(409).json({ message: "this username exists"})
				
				// Encryt the password
				const hash = await encryptar( password );
				await conexion.query("INSERT INTO users VALUES (?, ?, ?)", 
				[username, hash, id_student] );
				return res.status(201).json("New User registed!")
			}

		} else {
			return res.status(409).json({ message:"Data insufficient or Invalid Data"})
		}

	} catch(e) {
		return res.status(500).send("Internal server Error")
	}	
}


students.singIn = async (req,res,next) => {

	const { id, password } = req.body

	const [data] = await conexion.query("SELECT userId, password FROM users WHERE userId = (?)",[id])

	if(data.length == 0)
		return res.status(400).json({ Access: "Denegade" , message: "Password or ID Invalid", success:0})
	
	const [ user ] = data;
	const validate = await comparar( password , user.password )

	if( !validate )
		return res.status(404).json({message:"Password or ID Invalid"})
	
	const token = jwt.sign( { username: user.userId }, process.env.SECRET,{expiresIn:'1h'})

	return res.status(200).json({ Access: "Aprob" , token: token, success:1, username: user.userId})

}


module.exports = students;