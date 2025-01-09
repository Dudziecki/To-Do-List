import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onChange:(newTitle:string)=>void
}
export const EditableSpan: React.FC<EditableSpanType> = ({title,onChange}) => {
    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const activateEditModeHandler = () => {
        setEditMode(true)
        setEditTitle(title)

    }
    const activateViewModeHandler = () => {
        setEditMode(false)
        onChange(editTitle)
    }
    const onEditTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.currentTarget.value)

    return editMode
        ? <input type="text"
                 value={editTitle}
                 onChange={onEditTitleChangeHandler}
                 onBlur={activateViewModeHandler}
                 autoFocus/>
        : <span onDoubleClick={activateEditModeHandler}>{title}</span>


}