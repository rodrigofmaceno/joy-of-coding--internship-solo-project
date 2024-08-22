'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { notFound, useRouter } from "next/navigation";
import { Task } from "@prisma/client";

interface TaskFormData {
  name: string,
  description: string,
  dueDate: string,
  category?: string,
}

const TaskForm = ({task}: {task?: Task}) => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskFormData>();

  if (!task)   // Needed this for line 39 to work
    notFound(); 

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
      if (data.category == "") {
        data.category = " ";
      }

      await axios.patch(`/api/tasks/${task?.id}`, data);
      router.push('/tasks');
      router.refresh();

    })}>
      <p className="text-2xl py-3">Edit the Task</p>
      <TextField.Root defaultValue={task?.name} placeholder="Name" {...register('name')}></TextField.Root>
      <TextArea className="h-36" defaultValue={task?.description} placeholder="Description" {...register('description')}/>
      <TextField.Root defaultValue={JSON.stringify(task?.dueDate).slice(1,11)} placeholder="Due date as YYYY/MM/DD" {...register('dueDate')}></TextField.Root>
      {task.category &&<TextField.Root defaultValue={task.category} placeholder="Category" {...register('category')}></TextField.Root>}
      <Button>Submit task</Button>
    </form>
  );
};

export default TaskForm;
