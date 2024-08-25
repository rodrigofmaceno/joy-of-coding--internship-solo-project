'use client';

import { Button, TextArea, TextField, Text } from "@radix-ui/themes";
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { notFound, useRouter } from "next/navigation";
import { Task } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/createTaskSchema";

interface TaskFormData {
  name: string,
  description: string,
  dueDate: string,
  category: string,
}

const TaskForm = ({task}: {task?: Task}) => {
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema)
  });

  if (!task) 
    notFound(); 

  return (
    <div className="flex justify-center h-[500px] w-full">
    <form className="flex-none w-[600px] h-full space-y-2" onSubmit={handleSubmit(async (data) => {

      await axios.patch(`/api/tasks/${task?.id}`, data);
      router.push('/tasks');
      router.refresh();
    
    })}>
      <p className="text-2xl py-3">Edit the Task</p>
      <TextField.Root defaultValue={task?.name} placeholder="Name" {...register('name')}></TextField.Root>
      {errors.name && <Text color="red">{errors.name.message}</Text>}
      <TextArea className="h-60 w-full" defaultValue={task?.description} placeholder="Description" {...register('description')}/>
      {errors.description && <Text color="red">{errors.description.message}</Text>}
      <TextField.Root defaultValue={task?.dueDate} placeholder="Enter date as MM-DD-YYYY" {...register('dueDate')}></TextField.Root>
      {errors.dueDate && <Text color="red">{errors.dueDate.message}</Text>}
      {task.category ? <TextField.Root defaultValue={task?.category} placeholder="Category" {...register('category')}></TextField.Root> : <TextField.Root placeholder="Category" {...register('category')}></TextField.Root>}
      {errors.category && <Text color="red">{errors.category.message}</Text>}
      <Button>Submit task</Button>
    </form>
    </div>
  );
};

export default TaskForm;
