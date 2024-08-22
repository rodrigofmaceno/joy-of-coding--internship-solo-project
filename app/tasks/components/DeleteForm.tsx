'use client';

import { Task } from '@prisma/client';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

interface DeleteForm {
    confirmation: string
  }

const DeleteForm = ({task}: {task?: Task}) => {
    const router = useRouter();

      const {handleSubmit} = useForm<DeleteForm>(); //somehow not working without it
    
      if (!task)
          notFound();
      
      // console.log(task)
    
      return (

        <div className="flex flex-wrap justify-center">
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
        
        
        // if(data.confirmation.toLowerCase() === 'yes')
        // {}


        await axios.delete(`/api/tasks/${task.id}`);
        router.push('/tasks');
        router.refresh();
        
        })}>
          <p className="text-2xl py-3">Are you sure you want to delete this task?</p>
          {/* <TextField.Root placeholder="Type yes or no"  {...register('confirmation')}></TextField.Root> */}
    
          <Button>Confirm</Button>
        </form>
        </div>
        )
}

export default DeleteForm