import React, {ChangeEvent, useState} from "react";

import {filterType, TasksType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: filterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void

}

export function Todolist(props: PropsType) {
    // const {title,tasks}=props деструктуризация
    const tasksList = props.tasks.length === 0
        ? <span>You todolist is empty</span>
        : <ul>

            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x
                            </button>
                        </li>
                    )
                })
            }
        </ul>

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    let [title, setTitle] = useState("")
    const addTask = () => {
        if (title.trim() === " ") return

        props.addTask(newTaskTitle)

        setTitle("")
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input type="text" value={newTaskTitle} onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}
                >+
                </button>
            </div>
            <ul>
                {tasksList}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>all
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>


            </div>
        </div>
    )
}