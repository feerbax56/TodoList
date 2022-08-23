import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
// CLI command Line interface
//GUI  графический интерфейс => CRUD create reed update delete

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    //BLL: ;данные и функции обслуживания
    const todoListTitle: string = 'What to learn today'
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML + CSS', isDone: true},
        {id: 2, title: 'JS & TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState('all')

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

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

    //UI
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={getTasksForTodoList()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
