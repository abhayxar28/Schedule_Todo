import { getServerSession } from "next-auth";
import { prisma } from "./prisma";
import { addMinutes, endOfDay, startOfDay } from "date-fns";
import { authOption } from "./auth";

export async function createTodo(title: string){
  const session = await getServerSession(authOption);
  const userId = session?.user.id as string
    try{
        const todos = await prisma.todo.create({
            data:{
              title,
              userId
            }
        })
        return {todos}
    }catch(error){
        return {error}
    }
}   

export async function createFutureTodo(title: string, createdAt: string){
    const session = await getServerSession(authOption);
    const userId = session?.user.id as string
    try{
        const todos = await prisma.todo.create({
            data:{
                title,
                createdAt: new Date(createdAt),
                userId

            }
        })
        return {todos}
    }catch(error){
        return {error}
    }
}   

export async function getTodos() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const session = await getServerSession(authOption);
  const userId = session?.user.id as string

  try {
    const todos = await prisma.todo.findMany({
      where: {
        createdAt: {
          gte: startOfToday,  
          lt: startOfTomorrow 
        },
        userId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    return { todos };
  } catch (error) {
    console.error('❌ Failed to fetch today\'s todos:', error);
    return { error };
  }
}

export async function getPastTodos() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const session = await getServerSession(authOption);
  const userId = session?.user.id as string

  try {
    const todos = await prisma.todo.findMany({
      where: {
        createdAt: {
          lt: startOfToday, 
        },
        userId
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { todos };
  } catch (error) {
    console.error('❌ Failed to fetch past todos:', error);
    return { error };
  }
}

export async function getFutureTodos() {
  const session = await getServerSession(authOption);
  const userId = session?.user.id as string
  const now = new Date();
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  try {
    const todos = await prisma.todo.findMany({
      where: {
        createdAt: {
          gte: startOfTomorrow,
        },
        userId
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return { todos };
  } catch (error) {
    console.error('❌ Failed to fetch future todos:', error);
    return { error };
  }
}



export async function updateTodos(id: string, isCompleted: boolean){
    try{
        const updateTodos = await prisma.todo.update({
            where: {
                id
            }, data: {
                isCompleted
            }
        })
        return {updateTodos}
    }catch(error){
        return {error}
    }
}

export async function deleteTodos(id: string){
    try{
        const deleteTodos = await prisma.todo.delete({
            where:{
                id
            }
        })
        return {deleteTodos}
    }catch(error){
        return {error}
    }
}

export async function getCompletedTodosToday() {
  const now = new Date();
  const IST_OFFSET_MINUTES = 330;

  const istNow = addMinutes(now, IST_OFFSET_MINUTES);

  const istStart = addMinutes(startOfDay(istNow), -IST_OFFSET_MINUTES);
  const istEnd = addMinutes(endOfDay(istNow), -IST_OFFSET_MINUTES);
  const session = await getServerSession(authOption);
  const userId = session?.user.id as string

  try {
    const completedTodos = await prisma.todo.findMany({
      where: {
        isCompleted: true,
        updatedAt: {
          gte: istStart,
          lte: istEnd,
        },
        userId
      },
    });
    return { completedTodos };
  } catch (error) {
    return { error };
  }
}