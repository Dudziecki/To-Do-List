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
type toDoListType = {
    id: string,
    title: string
    filter: filterType
}


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

    // console.log(tasks)


    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function changeFilter(value: filterType, toDoListId: string) {
        let todoList=todoLists.find(tl=>tl.id===toDoListId)
        if(todoList){
            todoList.filter=value
            setTodoList([...todoLists])
        }
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let [todoLists, setTodoList] = useState<Array<toDoListType>>(
        [
            {
                id: v1(),
                title: 'Movies',
                filter: 'active'
            },
            {
                id: v1(),
                title: 'What to learn',
                filter: 'completed'
            }
        ]
    )

    return (
        <div className="App">

            {todoLists.map(tl => {
                let tasksForToDoList = tasks
                if (tl.filter === "active") {
                    tasksForToDoList = tasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    tasksForToDoList = tasks.filter(t => t.isDone === true)
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}

            {/*<Todolist title="What can i do"  tasks={task2}/>*/}

        </div>
    );
}

export default App;
