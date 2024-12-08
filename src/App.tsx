import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean

}
export type filterType = "all" | "active" | "completed"


function App() {

    // let task2:Array<TasksType>=[
    //     {id:1,title:"Html&Css",isDone:false},
    //     {id:2,title:"Js",isDone:true},
    //     {id:3,title:"React",isDone:true},
    // ]
    let [tasks, setTasks] = useState([
        {id: v1(), title: "Avengers", isDone: false},
        {id: v1(), title: "Pirates", isDone: true},
        {id: v1(), title: "XXX", isDone: true},
        {id: v1(), title: "Html&Css", isDone: false},
        {id: v1(), title: "Js", isDone: true},
        {id: v1(), title: "React", isDone: true},
    ]);

    console.log(tasks)
    let [filter, setFilter] = useState<filterType>("all")

    let tasksForToDoList = tasks
    if (filter === "active") {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: filterType) {
        setFilter(value)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }
    function addTask(title:string){
        let newTask={id:v1(), title:title, isDone: false};
        let newTasks=[newTask,...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist title="Movies" tasks={tasksForToDoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
            {/*<Todolist title="What can i do"  tasks={task2}/>*/}

        </div>
    );
}

export default App;
