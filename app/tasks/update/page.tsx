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

interface Form1 {
  name1: string
}

let item: any;

const NewTaskPage = () => {

  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskForm>();
  const reg = useForm<Form1>();
  

  return (                                                                            
    <>
    <form className="max-w-xl space-y-3" onSubmit={reg.handleSubmit(async (data1) => {
        await axios.get(`/api/tasks/`).then((response) => {response.data.map((element : any) => {if(data1.name1 == element.name) item = element;})});

      })}>
        <p className="text-2xl py-3">What Task Do You Want to Edit?</p>
        <TextField.Root placeholder="Type Task name" {...reg.register('name1')}></TextField.Root>
        <Button>Search task</Button>
        
      </form>

      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
        if (item) { 
          if (!data.name) {data.name = item.name}
          if (!data.description) {data.description = item.description}
          if (!data.dueDate) {data.dueDate = item.dueDate}
          if (!data.category) {data.category = item.category}
          await axios.patch(`/api/tasks/${item.id}`, data);
          router.push('/tasks');
        } 

      })}>
        <p className="text-2xl py-3">Edit Task</p>
        <TextField.Root placeholder={"Name"} {...register('name')}></TextField.Root>
        <TextArea placeholder="Description" {...register('description')}/>
        <TextField.Root placeholder="Due date as YYYY/MM/DD" {...register('dueDate')}></TextField.Root>
        <TextField.Root placeholder="Category" {...register('category')}></TextField.Root>
        <Button>Submit task</Button>
      </form>
    
    </>
  );
};

export default NewTaskPage;