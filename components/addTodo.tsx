"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { addTodoAction } from "@/lib/action"
import { toast } from "sonner"
import { newTodoSchema } from "@/lib/schema"
import { useCompletedTodoStore, useTodoStore } from "@/lib/store/todoStore"

export default function AddTodos() {
  const [validationError, setValidationError] = useState({ title: "" })
  const [state, dispatch, isPending] = useActionState(addTodoAction, {
    success: "",
    error: undefined,
  })

  const completedTodoCount = useCompletedTodoStore((state) => state.completedTodoCount)
  const todoCount = useTodoStore((state) => state.todoCount)
  const setTodoCount = useTodoStore((state) => state.setTodoCount)

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      setTodoCount(todoCount + 1)
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  function formAction(formData: FormData) {
    const data = Object.fromEntries(formData.entries())
    const result = newTodoSchema.safeParse(data)

    if (!result.success) {
      setValidationError({ title: result.error.errors[0].message })
      return
    }

    dispatch(formData)
  }

  function validate(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    const data = { title: value }
    const result = newTodoSchema.safeParse(data)

    if (!result.success) {
      setValidationError({ title: result.error.errors[0].message })
    } else {
      setValidationError({ title: "" })
    }
  }

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mt-12 max-w-2xl mx-auto px-4 sm:px-6">
      <div className="mb-5">
        <h1 className="text-4xl font-bold">Today's To-Dos</h1>
        <p className="font-semibold text-gray-700">{formattedDate}</p>
        <h3 className="text-gray-600">{`${completedTodoCount} of ${todoCount} tasks completed`}</h3>
      </div>

      <div className="text-xl font-bold">Add New Task</div>

      <form action={formAction}>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="w-full">
            <Input
              type="text"
              name="title"
              placeholder="Enter a task"
              onChange={validate}
            />
            {validationError.title && (
              <div className="text-red-500 text-sm mt-2">{validationError.title}</div>
            )}
          </div>
          <Button type="submit" className="cursor-pointer">
            {isPending ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  )
}
