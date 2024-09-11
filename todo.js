const express = require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

let fileBased = path.join(__dirname,"tasks.json")

function readTasks(){
    try{
        const data = fs.readFileSync(fileBased,"utf-8")
        return JSON.parse(data)
    }
    catch{
        console.error("Nhi padh paaa raha mai")
        return []
    }
}

function writeTasks(tasks){
    try{
        fs.writeFileSync(fileBased,JSON.stringify(tasks,null,2))
    }
    catch(err){
        console.error("tujhe likhana nhi aata",err)
    }
}

app.get("/tasks",function(req,res){
    const tasks = readTasks()
    res.json(tasks)
})

app.post("/addTask",function(req,res){
    const tasks = readTasks()
    const newTask = {
        tasks: req.body.inputTasks
    }
    tasks.push(newTask)
    writeTasks(tasks)
    res.status(200).json({
        message: "tasks is added"
    })
})

app.delete('/deleteTasks',function(req,res){
    const tasks = readTasks()
    const id = parseInt(req.body.index)
    tasks.splice(id,1)
    writeTasks(tasks)
    res.json({
        message: "tasks is deleted"
    })
})

app.listen(3000)