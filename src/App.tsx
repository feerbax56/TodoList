import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
// CLI command Line interface
//GUI  графический интерфейс => CRUD create reed update delete

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    //BLL: ;данные и функции обслуживания
    const todoListTitle: string = 'What to learn today'
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML + CSS', isDone: true},
        {id: v1(), title: 'JS & TS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id !== taskID ? t : {...t, isDone}))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    //UI
    const getTasksForTodoList = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks;
        }
    }


    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
