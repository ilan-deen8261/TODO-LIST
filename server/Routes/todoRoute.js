const express = require('express')
const { createToDo, getAllToDo, updateToDo, deleteTodo } = require("../controllers/todoCtrl")



const todoRouter = express.Router()

//get-> read
//post-> send/create
//put-> update
//delete-> delete

// http://localhost:3000/getall'
todoRouter.get('/getall', getAllToDo)
todoRouter.post('/', createToDo)
todoRouter.put('/updateToDo/:id', updateToDo)
todoRouter.delete('/deleteToDo/:id', deleteTodo)

module.exports = todoRouter