'use client';

import { Task } from '@prisma/client';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

interface DeleteForm {
    confirmation: string
  }

const DeleteForm = ({task}: {task?: Task}) => {
    const router = useRouter();

      const {handleSubmit} = useForm<DeleteForm>(); 
    
      if (!task)
          notFound();
    
      return (
        <>
          <div className="flex justify-center w-full">
            <form className="flex-none w-[600px] h-full " onSubmit={handleSubmit(async (data) => {

              await axios.delete(`/api/tasks/${task.id}`);
              router.push('/tasks');
              router.refresh();
            
            })}>
              <p className="text-center text-2xl py-3">Are you sure you want to delete this task?</p>
              <div className='flex justify-center py-3'><Button>Confirm</Button></div>
              
            </form>
          </div>
          <div className='flex justify-center py-3'>
            <Link href="/tasks"><Button color='red'>Cancel</Button></Link>
          </div>
        </>
      )
}

export default DeleteForm