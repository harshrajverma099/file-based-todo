let inputElement = document.querySelector("input")
let taskList = document.querySelector("#taskList")

async function addTask(){
    if(inputElement.value === ""){
        alert("Enter Your Task")
    }
    else{
        const response = await axios.post("http://localhost:3000/addTask",{
            inputTasks: inputElement.value
        })
        console.log(response.data)
        render()
    }
}

async function deleteBtn(index){
    const response = await axios.delete("http://localhost:3000/deleteTasks",{
        index: index
    })
    console.log(response.data)
    render()
}

function createComponent(task,index){
    let div = document.createElement("div")
    div.innerHTML = task.tasks
    let button = document.createElement("button")
    button.innerHTML = "Delete"
    button.setAttribute("onclick",`deleteBtn(${index})`)
    div.appendChild(button)
    return div
}

async function render(){

    taskList.innerHTML = ""
    const response = await axios.get("http://localhost:3000/tasks")
    let tasks = response.data
    for(let i=0; i<tasks.length; i++){
        const element = createComponent(tasks[i],i)
        taskList.appendChild(element)
    }
    inputElement.value = ""
}

render()