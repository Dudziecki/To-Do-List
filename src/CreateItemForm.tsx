import React, {useState} from 'react';
import {Button} from "./Button";

type PropsType={
    addItem:(itemTitle:string)=>void
}
export const CreateItemForm:React.FC<PropsType> = ({addItem}) => {
    const [newItemTitle, setNewItemTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewItemTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newItemTitle.trim() !== "") {
            addItem(newItemTitle)
            setNewItemTitle("")
        } else {
            setError("This Field is required")
        }
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }
    return (

        <div>
            <input
                className={error ? "error" : ""}
                type="text"
                value={newItemTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <Button
                onClick={addTask}
            >+
            </Button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>

    );
};

