import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
}
export const EditableSpan: React.FC<EditableSpanType> = ({title}) => {
    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const activateEditModeHandler = () => setEditMode(true);
    const activateViewModeHandler = () => setEditMode(false);
    const onEditTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.currentTarget.value)

    return editMode
        ? <input type="text"
                 value={editTitle}
                 onChange={onEditTitleChangeHandler}
                 onBlur={activateViewModeHandler}
                 autoFocus/>
        : <span onDoubleClick={activateEditModeHandler}>{title}</span>


}