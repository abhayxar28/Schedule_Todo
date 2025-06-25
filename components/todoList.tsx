"use client";

import { useEffect } from "react";
import { useCompletedTodoStore, useTodoStore } from "@/lib/store/todoStore";
import TodoItem from "./todoItem";
import { Todo } from "@prisma/client";

type TodoListProps = {
  todos: Todo[];
  completedTodos: Todo[];
};

export default function TodoList({ todos, completedTodos }: TodoListProps) {
  const setTodoCount = useTodoStore((state) => state.setTodoCount);
  const setCompletedTodoCount = useCompletedTodoStore((state) => state.setCompletedTodoCount);

  useEffect(() => {
    setTodoCount(todos.length);
  }, [todos]);

  useEffect(() => {
    setCompletedTodoCount(completedTodos.length);
  }, [completedTodos]);

  return (
    <div className="mt-12 mx-auto max-w-2xl px-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Todo List</h2>

      {todos.length === 0 ? (
        <div className="text-gray-500 text-sm text-center mt-10">
          No tasks for today. ✨
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
