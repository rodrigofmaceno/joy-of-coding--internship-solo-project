
import prisma from '@/prisma/client'
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import DeleteForm from '../../components/DeleteForm';

interface Props {
    params : {id: string}
}



const DeleteTask = async ({params} : Props) => {
  const task = await prisma.task.findUnique({
    where: {id: parseInt(params.id)}
    
  });

  if(!task)
  notFound();

return (
  <DeleteForm task= {task}/>
);
}

export default DeleteTask
