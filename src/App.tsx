import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { CreateItemForm } from './CreateItemForm';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type filterType = 'all' | 'active' | 'completed';

type toDoListType = {
    id: string;
    title: string;
    filter: filterType;
};

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const [todoLists, setTodoList] = useState<Array<toDoListType>>([
        { id: todoListId1, title: 'Movies', filter: 'all' },
        { id: todoListId2, title: 'What to learn', filter: 'all' },
    ]);

    const [tasksObj, setTasksObj] = useState<{
        [key: string]: Array<TasksType>;
    }>({
        [todoListId1]: [
            { id: v1(), title: 'Avengers', isDone: false },
            { id: v1(), title: 'Pirates', isDone: true },
            { id: v1(), title: 'XXX', isDone: true },
        ],
        [todoListId2]: [
            { id: v1(), title: 'Html&Css', isDone: false },
            { id: v1(), title: 'React', isDone: true },
        ],
    });

    const addTask = (title: string, todoListId: string) => {
        const newTask = { id: v1(), title, isDone: false };
        setTasksObj((prev) => ({
            ...prev,
            [todoListId]: [newTask, ...prev[todoListId]],
        }));
    };

    const removeTask = (taskId: string, todoListId: string) => {
        setTasksObj((prev) => ({
            ...prev,
            [todoListId]: prev[todoListId].filter((task) => task.id !== taskId),
        }));
    };

    const changeStatusTask = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasksObj((prev) => ({
            ...prev,
            [todoListId]: prev[todoListId].map((task) =>
                task.id === taskId ? { ...task, isDone } : task
            ),
        }));
    };

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        // setTasksObj((prev) => ({
        //     ...prev,
        //     [todoListId]: prev[todoListId].map((task) =>
        //         task.id === taskId ? { ...task, title } : task
        //     ),
        // }));
        let todolistTasks=tasksObj[todoListId]
        let task=todolistTasks.find(t=>t.id===taskId)
        if(task){
            task.title=title
            setTasksObj({...tasksObj})
        }
    };
    const changeTodolistTitle = (todoListId: string,  title: string) => {


        let todoList=todoLists.find(t=>t.id===todoListId)
        if(todoList){
            todoList.title=title
            setTodoList([...todoLists])
        }
    };

    const changeFilterTask = (filter: filterType, todoListId: string) => {
        setTodoList((prev) =>
            prev.map((tl) =>
                tl.id === todoListId ? { ...tl, filter } : tl
            )
        );
    };

    const removeTodolist = (todoListId: string) => {
        setTodoList((prev) => prev.filter((tl) => tl.id !== todoListId));
        setTasksObj((prev) => {
            const updatedTasks = { ...prev };
            delete updatedTasks[todoListId];
            return updatedTasks;
        });
    };

    const createToDoList = (title: string) => {
        const newTodoList: toDoListType = { id: v1(), title, filter: 'all' };
        setTodoList((prev) => [newTodoList, ...prev]);
        setTasksObj((prev) => ({ ...prev, [newTodoList.id]: [] }));
    };

    const todolistComponents = todoLists.map((tl) => {
        let tasksForToDoList = tasksObj[tl.id];
        if (tl.filter === 'active') {
            tasksForToDoList = tasksForToDoList.filter((t) => !t.isDone);
        } else if (tl.filter === 'completed') {
            tasksForToDoList = tasksForToDoList.filter((t) => t.isDone);
        }

        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilterTask}
                addTask={addTask}
                changeTaskStatus={changeStatusTask}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        );
    });

    return (
        <div className="App">
            <CreateItemForm addItem={createToDoList} />
            {todolistComponents}
        </div>
    );
}

export default App;
