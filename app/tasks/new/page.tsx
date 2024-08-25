'use client';

import { Button, TextArea, TextField, Text } from "@radix-ui/themes";
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/createTaskSchema";

interface TaskForm {
  name: string,
  description: string,
  dueDate: string,
  category: string,
}

const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<TaskForm>({
    resolver: zodResolver(createTaskSchema)
  });

  return (
    <div className="flex justify-center h-[500px] w-full">
      <form className="flex-none w-[600px] h-full space-y-2" onSubmit={handleSubmit(async (data) => {

        await axios.post('/api/tasks', data);
        router.push('/tasks');
        router.refresh(); // For some reason page doesn't refresh automatically without it

      })}>
        <p className="text-2xl py-3">Create a Task</p>
        <TextField.Root placeholder="Name" {...register('name')}></TextField.Root>
        {errors.name && <Text color="red">{errors.name.message}</Text>}
        <TextArea className="h-60 w-full" placeholder="Description" {...register('description')}/>
        {errors.description && <Text color="red">{errors.description.message}</Text>}
        <TextField.Root placeholder="Enter date as MM-DD-YYYY" {...register('dueDate')}></TextField.Root>
        {errors.dueDate && <Text color="red">{errors.dueDate.message}</Text>}
        <TextField.Root placeholder="Category" {...register('category')}></TextField.Root>
        {errors.category && <Text color="red">{errors.category.message}</Text>}
        <Button>Submit task</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
