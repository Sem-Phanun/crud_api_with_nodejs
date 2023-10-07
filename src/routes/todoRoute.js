const express = require('express')
const router = express.Router()
const todos = require("../controllers/todoController")
const baseUrl = "/api/todos"

router.get(`${baseUrl}`,todos.getTodosList)
router.get(`${baseUrl}/:id`,todos.getById)
router.post(`${baseUrl}`,todos.createTodoList)
router.put(`${baseUrl}`,todos.updateItem)
router.delete(`${baseUrl}/:id`, todos.removeItem)

module.exports = router