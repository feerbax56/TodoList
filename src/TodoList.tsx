import React from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map(task => {

            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <ListItem key={task.id} className={task.isDone ? 'isDone' : ''} style={{padding: '0'}}>
                    <Checkbox
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        checked={task.isDone}
                        size={'small'}
                        color={'default'}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        color={'secondary'}
                        onClick={() => {
                            props.removeTask(task.id, props.todoListId)
                        }}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                    {/*<button onClick={() => {*/}
                    {/*    props.removeTask(task.id, props.todoListId)*/}
                    {/*}}>del*/}
                    {/*</button>*/}
                </ListItem>
            )
        }) : <span> Tasks list is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => () => props.changeFilter(filter, todoListId)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    onClick={() => props.removeTodoList(props.todoListId)}
                    color={'primary'}
                >
                    <DeleteForeverIcon/>
                </IconButton>
                {/*<button onClick={() => props.removeTodoList(props.todoListId)}>x</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup size="small" variant={'contained'} aria-label="contained primary button group">
                    <Button
                        // size="small"
                        // variant={'contained'}
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        // disableElevation
                        // style={{margin: '1px'}}
                        onClick={handlerCreator('all', props.todoListId)}>All
                    </Button>
                    <Button
                        // size="small"
                        // variant={'contained'}
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        // disableElevation
                        // style={{margin: '1px'}}
                        onClick={handlerCreator('active', props.todoListId)}>Active
                    </Button>
                    <Button
                        // size="small"
                        // variant={'contained'}
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        // disableElevation
                        // style={{margin: '1px'}}
                        onClick={handlerCreator('completed', props.todoListId)}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoList;