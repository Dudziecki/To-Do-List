import React, {ChangeEvent, useState} from "react";

import {filterType, TasksType} from "./App";
import {Button} from "./Button";
import {CreateItemForm} from "./CreateItemForm";


type PropsType = {
    title: string
    id:string
    tasks: Array<TasksType>
    removeTask: (id: string,todoListId:string) => void
    changeFilter: (value: filterType,toDoListId:string) => void
    addTask: (title: string,todoListId:string) => void
    removeTodolist:(todoListId:string)=>void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId:string) => void
    filter: filterType


}

export function Todolist(props: PropsType) {
    // const {title,tasks}=props деструктуризация
    const tasksList = props.tasks.length === 0
        ? <span>You todolist is empty</span>
        : <ul>

            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id,props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
                    }
                    return (
                        <li key={t.id} className={ t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <Button onClick={onClickHandler}>x
                            </Button>
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
    const addTask = (title:string) => {

            props.addTask(title,props.id)

    }

    // const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask()
    //     }
    // }


    const onAllClickHandler = () => props.changeFilter("all",props.id)
    const onActiveClickHandler = () => props.changeFilter("active",props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id)
    const removeTodolistBtn=()=>{
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h1>
                {props.title}
            <button onClick={removeTodolistBtn}>x</button>
            </h1>
            <CreateItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        className={error ? "error" : ""}*/}
            {/*        type="text"*/}
            {/*        value={newTaskTitle}*/}
            {/*        onChange={onNewTitleChangeHandler}*/}
            {/*        onKeyPress={onKeyPressHandler}*/}
            {/*    />*/}
            {/*    <Button*/}
            {/*        onClick={addTask}*/}
            {/*    >+*/}
            {/*    </Button>*/}
            {/*    {error && <div className={"error-message"}>{error}</div>}*/}
            {/*</div>*/}
            <ul>
                {tasksList}

            </ul>
            <div>
                <Button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>all
                </Button>

                <Button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button className={ props.filter=== 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>


            </div>
        </div>
    )
}