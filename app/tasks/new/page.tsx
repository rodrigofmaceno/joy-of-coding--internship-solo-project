'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface TaskForm {
  name: string,
  description: string,
  dueDate: string,
  category?: string
}

const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskForm>();

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
      if (data.category == "") {
        data.category = " ";
      }
  
      await axios.post('/api/tasks', data);
      router.push('/tasks');

    })}>
      <p className="text-2xl py-3">Create a Task</p>
      <TextField.Root placeholder="Name" {...register('name')}></TextField.Root>
      <TextArea placeholder="Description" {...register('description')}/>
      <TextField.Root placeholder="Due date as YYYY/MM/DD" {...register('dueDate')}></TextField.Root>
      <TextField.Root placeholder="Category" {...register('category')}></TextField.Root>
      <Button>Submit task</Button>
    </form>
  );
};

export default NewTaskPage;
