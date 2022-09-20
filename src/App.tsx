import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
// CLI command Line interface
//GUI  графический интерфейс => CRUD create reed update delete

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    //BLL: ;данные и функции обслуживания Тест

    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodolist] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn today', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML + CSS', isDone: true},
            {id: v1(), title: 'JS & TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'vodka', isDone: true},
            {id: v1(), title: 'cucumber', isDone: false},
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        const updatedTasks = todoListTasks.filter(t => t.id !== taskId)
        const copyTask = {...tasks}
        copyTask[todoListId] = updatedTasks
        setTasks(copyTask)

        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        const todoListTasks = tasks[todoListId]
        const updatedTask = [newTask, ...todoListTasks]
        const copyTask = {...tasks}
        copyTask[todoListId] = updatedTask
        setTasks(copyTask)

        // setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]
    }

    const changeStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        const todoListsTasks = tasks[todoListId]
        const updatedTasks = todoListsTasks.map(t => t.id === taskID ? {...t, isDone} : t)
        const copyTask = {...tasks}
        copyTask[todoListId] = updatedTasks
        setTasks(copyTask)

        // setTasks({...tasks, [todoListId] : tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolist(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodolist(todoLists.filter(tl => tl.id !== todoListId))
    }


//UI
    const getTasksForTodoList = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id];
        }
    }

    const todoListComponents = todoLists.map(tl => {
        const tasks = getTasksForTodoList(tl)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
