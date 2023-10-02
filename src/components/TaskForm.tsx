import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskFormSchema, taskFormSchema, TaskFormProps } from '../lib/types';
import { v4 as uuidv4 } from 'uuid';

const TaskForm: React.FC<TaskFormProps> = ({ taskId, taskTitle, taskContent, taskDeadline, taskPriority}) => {


  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskTitle: taskTitle || '',
      taskContent: taskContent || '',
      taskDeadline: taskDeadline || '',
      taskPriority: taskPriority || 'Low'
    }
  })

  const onSubmitData = (data: TaskFormSchema) => {
    console.log(data);

    if(taskId) {
      const taskData = {
        ...data,
        taskId,
      }
      console.log(taskData)
      reset()
    }

    const taskData = {
      ...data,
      taskId: uuidv4(),
      taskCreationDate: new Date()
    }
    console.log(taskData)
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <input
        {...register('taskTitle')}
        type='text'
        name='taskTitle'
        placeholder='Your task title.'
      />
      {errors.taskTitle &&(<p>{errors.taskTitle.message}</p>)}
      <input
        {...register('taskContent')}
        type='text'
        name='taskContent'
        placeholder='Your task description.'
      />
      <input
        {...register('taskDeadline')}
        type='datetime-local'
        name='taskDeadline'
      />
      <select 
        name='taskPriority'
        id='taskPriority'>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
      </select>
      <button
        type='submit'
        disabled={isSubmitting}>
        Submit Task
      </button>
    </form>
  )
}

export default TaskForm