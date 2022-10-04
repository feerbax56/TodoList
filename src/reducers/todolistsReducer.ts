import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';


type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

type addTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type changeFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListID: string
}

type changeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}

type ActionType = RemoveTodoListAT | addTodoListAT | changeFilterAT | changeTodoListTitleAT


export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            const newTodoListId: string = v1()
            return [...todolists, {id: newTodoListId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListId: id})
export const AddTodoListAC = (title: string): addTodoListAT => ({type: 'ADD-TODOLIST', title})
export const ChangeFilterAC = (filter: FilterValuesType, todoListID: string): changeFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todoListID
})
export const ChangeTodoListTitleAC = (title: string, todoListId: string): changeTodoListTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    todoListId
})