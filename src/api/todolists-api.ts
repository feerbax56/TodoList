import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a8b3f792-c86a-402e-ae16-b0eaccc93801'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api

export const todolistsAPI = {
    getTodolists(){
        const promise = instance.get<TodolistType[]>('todo-lists')
    }
}


// types

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

