const express = require("express");
require("./config.js")
const morgan = require("morgan");
const path = require('node:path');
const conexion = require("./db.js")
const cors = require("cors")

const app = express()

// importando rutas
const students = require("./routes/students.js")
const courses = require("./routes/courses.js")

// setting
app.set('port', process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000 )

//Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'./public')))

// rutas
app.use( students )
app.use( courses )

app.get("/",(req,res)=>{
	res.status(200).send({message:"Welcome"});
})

app.get("/ping", async (req,res)=>{
	res.status(200).send({ message: "Server Online!"})
})

// ruta final 404
app.use((req,res)=>{
    res.status(404).send('RESOURCE NOT FOUNT')
})


module.exports = app;