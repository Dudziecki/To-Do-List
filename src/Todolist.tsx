import React, {ChangeEvent, useState} from "react";

import {filterType, TasksType} from "./App";
import {Button} from "./Button";


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
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("This Field is required")
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }



    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    className={error ? "error" : ""}
                    type="text"
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}
                >+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {tasksList}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>all
                </button>
                <Button  onClick={onActiveClickHandler}>test</Button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <Button variant={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>


            </div>
        </div>
    )
}