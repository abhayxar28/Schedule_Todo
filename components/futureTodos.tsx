"use client";

import { useEffect, useTransition } from "react";
import { useTodosStore } from "@/lib/store/todoStore";
import { Todo } from "@prisma/client";
import { CalendarIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { deleteTodoAction, updateTodoAction } from "@/lib/action";
import { toast } from "sonner";
import { useActionState } from "react";

type ScheduleTodosProps = {
  futureTodo: Todo[];
};

export default function FutureTodos({ futureTodo }: ScheduleTodosProps) {
  const futureTodos = useTodosStore((state) => state.futureTodos);
  const setFutureTodos = useTodosStore((state) => state.setFutureTodos);

  const [updateState, updateDispatch] = useActionState(updateTodoAction, {
    success: "",
    error: undefined,
  });
  const [deleteState, deleteDispatch] = useActionState(deleteTodoAction, {
    success: '',
    error: undefined,
  });
  const [, startTransition] = useTransition();

  useEffect(() => {
    setFutureTodos(futureTodo);
  }, [futureTodo, setFutureTodos]);

  useEffect(() => {
    if (updateState.success) {
      toast.success(updateState.success);
    } else if (updateState.error) {
      toast.error(updateState.error);
    }
  }, [updateState]);

    useEffect(()=>{
        if(deleteState.success){
            toast.success(deleteState.success);
        }else if(deleteState.error){
            toast.error(deleteState.error)
        }
    },[deleteState])

  const groupedTodos = futureTodos.reduce((acc, todo) => {
    const dateKey = format(new Date(todo.createdAt), "EEE, MMM dd, yyyy");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  const handleUpdate = (id: string, checked: boolean) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("isCompleted", checked.toString());
    startTransition(() => updateDispatch(formData));
  };

  const handleDelete = (id: string)=>{
    const formData = new FormData();

    formData.append("id",id);
    startTransition(()=>{
        deleteDispatch(formData);
    })
  }

  return (
    <div className="space-y-6 mt-6">
      {futureTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-lg py-12 px-6 shadow-sm">
            <CalendarIcon className="w-10 h-10 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium text-lg">No future tasks scheduled</p>
            <p className="text-sm text-gray-500 mt-1">Click "Schedule Task" to plan ahead.</p>
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
                  className="flex items-center justify-between bg-white rounded-lg shadow-sm border px-4 py-3 transition-colors peer-checked:bg-gray-100 peer-checked:opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      className="peer"
                      checked={todo.isCompleted}
                      onCheckedChange={(checked: boolean) =>
                        handleUpdate(todo.id, checked)
                      }
                    />
                    <Label
                      htmlFor={`todo-${todo.id}`}
                      className="cursor-pointer text-gray-800 peer-data-[state=checked]:line-through peer-data-[state=checked]:text-gray-400"
                    >
                      {todo.title}
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500">
                    <Trash
                      className="w-4 h-4 cursor-pointer hover:text-red-500"
                      onClick={() => handleDelete(todo.id)}
                    />
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
