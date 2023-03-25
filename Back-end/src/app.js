const express = require("express");
const morgan = require("morgan");
const path = require('node:path');
require("./config.js")
const conexion = require("./db.js")

const app = express()

// importando rutas
const students = require("./routes/students.js")

// setting
app.set('port', process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000 )

//Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'./public')))

// rutas
app.use( students )

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