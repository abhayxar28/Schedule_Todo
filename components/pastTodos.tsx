"use client";

import { useEffect } from "react";
import { useTodosStore } from "@/lib/store/todoStore";
import { Todo } from "@prisma/client";
import { CalendarIcon, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";

type ScheduleTodosProps = {
  pastTodo: Todo[];
};

export default function PastTodos({ pastTodo }: ScheduleTodosProps) {
  const pastTodos = useTodosStore((state) => state.pastTodos);
  const setPastTodos = useTodosStore((state) => state.setPastTodos);

  useEffect(() => {
    setPastTodos(pastTodo);
  }, [pastTodo, setPastTodos]);

  const groupedTodos = pastTodos.reduce((acc, todo) => {
    const dateKey = format(new Date(todo.createdAt), "EEE, MMM dd, yyyy");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="space-y-6 mt-6">
      {pastTodos.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-lg py-12 px-6 shadow-sm">
          <CalendarIcon className="w-10 h-10 text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-lg">No past tasks found</p>
          <p className="text-sm text-gray-500 mt-1">Completed or missed tasks will appear here.</p>
        </div>
      ) : (
        Object.entries(groupedTodos).map(([date, todos]) => (
          <div key={date}>
            <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              <CalendarIcon className="w-5 h-5" />
              {date}
            </div>

            <div className="space-y-4 mt-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between bg-white rounded-lg shadow-sm border px-4 py-3 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    {todo.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span
                      className={`${
                        todo.isCompleted
                          ? "line-through text-gray-500"
                          : "text-red-600 font-medium"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
