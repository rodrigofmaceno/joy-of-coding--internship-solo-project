'use client';

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface TaskForm {
  id: string,
}

interface ByName {
  name1: string
}

const NewTaskPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<TaskForm>();
  const reg = useForm<ByName>()

  return (
    <>
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
      await axios.delete(`/api/tasks/${data.id}`);
      router.push('/tasks');
    })}>
      <p className="text-2xl py-3">Delete by id</p>
      <TextField.Root placeholder="Type Id number" {...register('id')}></TextField.Root>
      <Button>Delete</Button>
    </form>

    <form className="max-w-xl space-y-3" onSubmit={reg.handleSubmit(async (data1) => {
        await axios.get(`/api/tasks/`).then((response) => {response.data.map(async (element : any) => {if(data1.name1 == element.name) {
          await axios.delete(`/api/tasks/${element.id}`);
          router.push('/tasks');
        };})});

      })}>
        <p className="text-2xl py-3">Delete by name</p>
        <TextField.Root placeholder="Type Task name" {...reg.register('name1')}></TextField.Root>
        <Button>Delete</Button>
        
      </form>
    </>
  );
};

export default NewTaskPage;
