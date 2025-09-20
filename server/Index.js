require('dotenv').config()
const express = require('express')
// const cors = require ('cors');
const RunServer = require('./database/Connection');
const todoRouter = require('./Routes/todoRoute');
const cors = require('cors')

const app = express()
const port = process.env.PORT;

// json : javascript object notation
// used to transfer the data
app.use(express.json())
app.use(cors())

RunServer()

app.use('/todolist',todoRouter)

app.listen(port,()=> {
console.log(`server is running on ${port}`)
})