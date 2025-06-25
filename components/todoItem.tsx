"use client";

import { Todo } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { formatDate } from "@/lib/utils";
import { useActionState, useEffect, useTransition } from "react";
import { deleteTodoAction, updateTodoAction } from "@/lib/action";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useCompletedTodoStore } from "@/lib/store/todoStore";

export default function TodoItem({ todo }: { todo: Todo }) {
  const completedTodoCount = useCompletedTodoStore((state) => state.completedTodoCount);
  const setCompletedTodoCount = useCompletedTodoStore((state) => state.setCompletedTodoCount);
  const [updateState, updateDispatch] = useActionState(updateTodoAction, {
    success: "",
    error: undefined,
  });

  const [deleteState, deleteDispatch] = useActionState(deleteTodoAction, {
    success: "",
    error: undefined,
  });

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (updateState.success) {
      toast.success(updateState.success);
      setCompletedTodoCount(completedTodoCount);
    } else if (updateState.error) {
      toast.error(updateState.error);
    }
  }, [updateState]);

  useEffect(() => {
    if (deleteState.success) {
      toast.success(deleteState.success);
    } else if (deleteState.error) {
      toast.error(deleteState.error);
    }
  }, [deleteState]);

  const handleUpdate = (checked: boolean) => {
    const formData = new FormData();
    formData.append("id", todo.id);
    formData.append("isCompleted", checked.toString());
    startTransition(() => {
      updateDispatch(formData);
    });
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("id", todo.id);
    startTransition(() => {
      deleteDispatch(formData);
    });
  };

  return (
    <li className="flex items-center gap-3 w-full p-2 border-b flex-wrap">
      {/* Checkbox */}
      <Checkbox
        id={todo.id}
        className="peer cursor-pointer"
        checked={todo.isCompleted}
        onCheckedChange={(checked: boolean) => handleUpdate(checked)}
      />

      {/* Title */}
      <Label
        htmlFor={todo.id}
        className="cursor-pointer peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through break-words"
      >
        {todo.title}
      </Label>

      {/* Spacer if title grows */}
      <div className="flex-1" />

      {/* Date & Trash */}
      <div className="flex items-center gap-3 text-sm text-gray-500 whitespace-nowrap">
        <span className="peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through">
          {formatDate(todo.updatedAt)}
        </span>
        <Trash
          size={18}
          strokeWidth={1}
          onClick={handleDelete}
          className="cursor-pointer hover:text-red-500 transition-colors"
        />
      </div>
    </li>
  );
}
