"use server"

import { revalidatePath } from "next/cache"
import { createFutureTodo, createTodo, deleteTodos, getTodos, updateTodos } from "./todos"
import { newTodoSchema } from "./schema"

type todoState ={
    success?: string,
    error?: string,
}

export async function addTodoAction(_todoState:todoState, formData: FormData){
    try{
        const data = Object.fromEntries(formData.entries());
        const result = newTodoSchema.safeParse(data);

        if(!result.success){
            return {error: result.error.errors[0].message}
        }

        const title = data.title as string
        await createTodo(title);
        return {success: "Todo added successfully"}
    }catch(error){
        return {error: (error as Error).message ?? "An error occurred"}
    }finally{
        revalidatePath('/todos')
    }
}

export async function addFutureTodoAction(_todoState:todoState, formData: FormData){
    try{

        const data = Object.fromEntries(formData.entries());
        const result = newTodoSchema.safeParse(data);

        if(!result.success){
            return {error: result.error.errors[0].message}
        }

        const title = data.title as string
        const createdAt = data.createdAt as string
        await createFutureTodo(title, createdAt);
        return {success: "Future Todo added successfully"}
    }catch(error){
        return {error: (error as Error).message ?? "An error occurred"}
    }finally{
        revalidatePath('/todos')
    }
}

export async function updateTodoAction(_todoState: todoState,formData: FormData){
    try{
        const isCompletedRaw = formData.get('isCompleted')
        const isCompleted = isCompletedRaw === "true"
        const id = formData.get('id') as string

        await updateTodos(id, isCompleted)
        return {success : 'Todo updated successfully'}
    }catch(error){
        return {error: (error as Error).message ?? "An error occurred"};
    }finally{
        revalidatePath('/todos')
    }
}

export async function deleteTodoAction(_todoState: todoState, formData: FormData){
    try{
        const id = formData.get('id') as string;
        await deleteTodos(id);
        return {success: 'Todo deleted successfully'}
    }catch(error){
        return {error: (error as Error).message ?? "An error occurred"};
    }finally{
        revalidatePath('/todos');
    }
}

export async function getTodosAction(){
    try{
        const todos = await getTodos();
        return {todos}
    }catch(error){
        return {error: (error as Error).message ?? "An error occurred"};
    }
}

