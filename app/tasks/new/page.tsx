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
  category?: string,
}

const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskForm>();

  return (
    <div className="flex justify-center h-[500px] w-full">
      <form className="flex-none w-[600px] h-full space-y-2" onSubmit={handleSubmit(async (data) => {
        if (data.category == "") {
          data.category = " ";
        }
    
        await axios.post('/api/tasks', data);
        router.push('/tasks');
        router.refresh(); // For some reason page doesn't refresh automatically without it

      })}>
        <p className="text-2xl py-3">Create a Task</p>
        <TextField.Root placeholder="Name" {...register('name')}></TextField.Root>
        <TextArea className="h-60 w-full" placeholder="Description" {...register('description')}/>
        <TextField.Root placeholder="Due date as YYYY/MM/DD" {...register('dueDate')}></TextField.Root>
        <TextField.Root placeholder="Category" {...register('category')}></TextField.Root>
        <Button>Submit task</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
