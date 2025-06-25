import {create} from 'zustand'
import { Todo } from '@prisma/client'

interface TodoState{
  todoCount: number,
  setTodoCount: (count: number) => void
}

interface CompletedTodoState{
  completedTodoCount: number,
  setCompletedTodoCount: (count: number) => void
}

interface TodoStore{
  futureTodos: Todo[]
  pastTodos: Todo[]
  setFutureTodos: (todos: Todo[]) => void
  setPastTodos: (todos: Todo[]) => void
}

export const useTodoStore = create<TodoState>((set)=>({
  todoCount: 0,
  setTodoCount: (count: number) => set({todoCount: count})
}))

export const useCompletedTodoStore = create<CompletedTodoState>((set)=>({
  completedTodoCount: 0,
  setCompletedTodoCount: (count: number) => set({completedTodoCount: count})
}))


export const useTodosStore = create<TodoStore>((set) => ({
  futureTodos: [],
  pastTodos: [],
  setFutureTodos: (todos) => set({ futureTodos: todos }),
  setPastTodos: (todos) => set({ pastTodos: todos }),
}))
