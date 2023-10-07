const db = require("../config/db")
const { validation }= require('../helper/validation')

const getTodosList = async (req,res)=> {
    const sql = 'SELECT * FROM tbl_todos'
    const text = await db.query(sql)
    if(!text){
        res.json({
            message: "Database error",
            error:true
        })
    }else{
        res.json({
            data: text
        })
    }
}

const getById = async (req,res)=>{
    const id = req.params.id
    const result = await db.query("SELECT title FROM tbl_todos WHERE todos_id =? ",[id])
    if(!result){
        res.json({
            message: "Error Data",
            error: true
        })
    }else{
        res.json({
            data: result
        })
    }
}

const createTodoList = async (req,res) => {
    var {title} = req.body
    var message = {}
    if(validation(title)){
        message.title = "Title is require"
    }
    if(Object.keys(message).length >0){
        res.json({
            message: message,
            error: true
        })
        return false
    }
    const result = await db.query("SELECT todos_id FROM tbl_todos WHERE title =?",[title])
    if(result.length > 0){
        res.json({
            msg: "Item already has",
            error: true
        })
        return false
    }
    
    var sql = "INSERT INTO tbl_todos(title) VALUES(?)"  
    const item = await db.query(sql,[title])
    if(!item){
        res.json({
            message: "Faild",
            error: true
        })
    }else{
        res.json({
            message: "Create success",
            data: item
        })
    }


}

const updateItem = async (req,res) => {
    var {id,title} = req.body
    var msg = {}
    if(validation(id)){
        msg.id = "Id is required!"
    }
    if(validation(title)){
        msg.title = "Title is required!"
    }
    if(Object.keys(msg).length > 0){
        res.json({
            message: msg,
            error: true
        })
        return false
    }
    var updateSql = "UPDATE tbl_todos SET title =? WHERE todos_id =?"
    const result = await db.query(updateSql,[title,id])
    if(result){
        res.json({
            message: "Update success",
            data: result
        })
    }
}

const removeItem = async (req,res) => {
    const id =req.params.id
    const data = await db.query("DELETE FROM tbl_todos WHERE todos_id = ?", [id])
    res.json({
        message: "Remove success",
        data: data
    })

}
module.exports = {
    getTodosList,
    getById,
    createTodoList,
    updateItem,
    removeItem
}