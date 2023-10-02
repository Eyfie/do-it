import { z } from 'zod';

export const taskFormSchema = z.object({
  taskTitle: z.string().min(1, 'Please enter a task title.'),
  taskContent: z.string(),
  taskDeadline: z.string(),
  taskPriority: z.string()
})

export type TaskFormSchema = z.infer<typeof taskFormSchema>
export type TaskFormProps = TaskFormSchema & {
  taskId: string;
}