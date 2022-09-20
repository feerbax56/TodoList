import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const addTaskOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        }
        if (e.key === 'Enter' && title.trim() === '') {
            setError('Title is required')
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChange}
                onKeyDown={addTaskOnKeyDown}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}
            >+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;