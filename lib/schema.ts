import z from 'zod'

export const newTodoSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters long")
})
