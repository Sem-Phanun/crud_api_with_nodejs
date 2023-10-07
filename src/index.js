const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const app = express()
dotenv.config()


//middleware setup 
app.use(express.json())
app.use(bodyParser.json())
app.use(cors(((origin= "*"))))

const todos = require("./routes/todoRoute")
app.use(todos)

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server running on PORT",+ process.env.PORT)
})