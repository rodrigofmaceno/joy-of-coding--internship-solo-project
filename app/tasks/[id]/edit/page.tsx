
import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import TaskForm from "../../components/TaskForm";


interface Props {
  params: { id: string},
}

const EditTaskPage = async ({params} : Props) => { 
  const task = await prisma.task.findUnique({
    where: {id: parseInt(params.id)}
    
  });

  // console.log(task)

  if(!task)
    notFound();

  return (
    // <div className="flex justify-center">
      <TaskForm task= {task}/>
    // </div>
    
  );
};

export default EditTaskPage;