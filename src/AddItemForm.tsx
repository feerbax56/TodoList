import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import {IconButton, TextField} from '@material-ui/core';

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

    // const userMessage =
    //     error
    //         ? <div style={{color: 'red'}}> Title is required </div>
    //         : <div> Please, create list item</div>

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
            <TextField
                label={'Please, create list item'}
                variant={'outlined'}
                size={'small'}
                error={error}
                value={title}
                onChange={onChange}
                onKeyDown={addTaskOnKeyDown}
                helperText={error && 'Title is required'}
            />

            <IconButton color={'inherit'} size={'medium'} onClick={addItem}>
                <PlusOneIcon/>
            </IconButton>

            {/*<button onClick={addItem}*/}
            {/*>+*/}
            {/*</button>*/}
            {/*{userMessage}*/}
        </div>
    );
};

export default AddItemForm;