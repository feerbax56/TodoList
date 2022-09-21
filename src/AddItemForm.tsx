import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }


    const addTaskOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') addTask()
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const userMessage =
        error
            ? <div style={{color: 'red'}}> Title is required </div>
            : <div> Please, create list item</div>

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChange}
                onKeyDown={addTaskOnKeyDown}
            />
            <button onClick={addItem}
            >+
            </button>
            {userMessage}
        </div>
    );
};

export default AddItemForm;