import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)


    const tasksItems = props.tasks.length
        ? props.tasks.map(task => {
            return (
                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                    <input
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked)}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span>{task.title}</span>
                    <button onClick={() => {
                        props.removeTask(task.id)
                    }}>del
                    </button>
                </li>
            )
        }) : <span> Tasks list is empty</span>
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const addTaskOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        }if (e.key === 'Enter' && title.trim() === '') {
            setError('Title is required')
        }
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChange}
                    onKeyDown={addTaskOnKeyDown}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}
                >+
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active' : ''}
                        onClick={handlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-active' : ''}
                        onClick={handlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;