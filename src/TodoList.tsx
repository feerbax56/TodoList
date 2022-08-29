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
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const tasksItems = props.tasks.length
        ? props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
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
        if (e.key === 'Enter') props.addTask(title)
    }
    const addTask = () => {
        props.addTask(title)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChange}
                    onKeyDown={addTaskOnKeyDown}
                />
                <button onClick={addTask}
                >+
                </button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;