const conexion = require("../db.js")

const students = {};


students.registerNewUser = async (req,res) =>{
	try {
		const { id, firstName, lastName, email, age, country, state } = req.body;

		if( id && firstName && lastName && email && age && country && state ){
			await conexion.query("INSERT INTO student VALUES (?, ?, ?, ?, ?)", 
			[id,firstName,lastName,email,age])
			await conexion.query("INSERT INTO location VALUES (?, ?, ?)", 
				[id, country, state])
			res.status(200).send({message:"add student!", success:1})
		}else{
			res.status(409).send({ message: "Data insufficient or Invalid Data"})
		}
		
	} catch(e) {
		res.status(500).send({ message: "Internal server error " + e.message })
	}
}

students.newUser = async (req,res) =>{
	try {
		const { id, password, id_student } = req.body
		
		if( id && password && id_student ){
			const [ data ]= await conexion.execute("SELECT id_student FROM student WHERE id_student = (?)",
				[id_student])
			if( data.length == 0 ){
				res.status(409).send({message:"You need register your information to create an user"})
			} else {
				await conexion.query("INSERT INTO users VALUES (?, ?, ?)", 
				[id, password, id_student] );
				res.status(200).send("New User registed!")
			}

		} else {
			res.status(409).send({ message:"Data insufficient or Invalid Data"})
		}

	} catch(e) {
		res.status(500).send("Internal server Error")
	}	
}

students.singIn = (req,res) => {
	res.status(200).send({message:"Login"})
}





module.exports = students;