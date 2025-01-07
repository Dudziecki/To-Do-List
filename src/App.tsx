import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm";

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
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [tasksObj, setTasksObj] = useState(
        {
            [todoListId1]: [
                {id: v1(), title: "Avengers", isDone: false},
                {id: v1(), title: "Pirates", isDone: true},
                {id: v1(), title: "XXX", isDone: true},
                {id: v1(), title: "Html&Css", isDone: false},
                {id: v1(), title: "Js", isDone: true},
                {id: v1(), title: "React", isDone: true},
            ],
            [todoListId2]: [
                {id: v1(), title: "Avengers", isDone: false},
                {id: v1(), title: "Pirates", isDone: true},

            ],


        }
    );

    // console.log(tasksObj)


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: filterType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        // let tasks=tasksObj[todoListId];
        // let newTasks = [task, ...tasks]
        // tasksObj[todoListId]=newTasks
        // setTasksObj({...tasksObj});
        setTasksObj(
            {
                ...tasksObj,
                [todoListId]: [task, ...tasksObj[todoListId]]
            }
        );

    }

    const removeTodolist = (todoListId: string) => {
        let removeTodolist = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(removeTodolist)
        delete tasksObj[todoListId]
        setTasksObj(tasksObj);
    }
    const createToDoList = (title: string) => {
        const todolistId = v1()
        const newTodolist: toDoListType = {id: todolistId, title: title, filter: 'all'}
        setTodoList([newTodolist, ...todoLists])
        setTasksObj({...tasksObj, [todolistId]: []});
    }


    let [todoLists, setTodoList] = useState<Array<toDoListType>>(
        [
            {
                id: todoListId1,
                title: 'Movies',
                filter: 'active'
            },
            {
                id: todoListId2,
                title: 'What to learn',
                filter: 'completed'
            }
        ]
    )
    const todolistComponents = todoLists.map(tl => {
        let tasksForToDoList = tasksObj[tl.id]
        if (tl.filter === "active") {
            tasksForToDoList = tasksObj[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForToDoList = tasksObj[tl.id].filter(t => t.isDone === true)
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
                removeTodolist={removeTodolist}

            />
        )
    })

    return (
        <div className="App">
            <CreateItemForm addItem={createToDoList}/>
            {todolistComponents}

            {/*<Todolist title="What can i do"  tasksObj={task2}/>*/}

        </div>
    );
}

export default App;
