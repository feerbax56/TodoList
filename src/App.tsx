import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
// CLI command Line interface
//GUI  графический интерфейс => CRUD create reed update delete

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
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
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
    }
    const changeStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, title} : t)
        })
    }


    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolist(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodolist(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodolist(todoLists.filter(tl => tl.id !== todoListId))
    }
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1()
        setTodolist([...todoLists, {id: newTodoListId, title, filter: 'all'}])
        setTasks({...tasks, [newTodoListId]: []})
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
            <Grid item key={tl.id}>
                <Paper
                    elevation={8}
                    style={{padding: '10px'}}
                >
                    <TodoList
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container  style={{padding: '15px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4} justify={'center'}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
