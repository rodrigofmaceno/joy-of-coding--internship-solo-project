import prisma from '@/prisma/client'
import { Flex, Box, Button, Card } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params : {id: string}
}

const DetailedTask = async ({params} : Props) => {
    const task = await prisma.task.findUnique(
        {
            where: { id: parseInt(params.id)}
        }
    );

    if (!task)
        notFound();

  return (
    <>
    <div className=" flex py-3 space-x-3 justify-center">
      <Button size="3" color="red">
        {/* <Link href="/tasks/delete"> Delete Task</Link> This was causing the issue of missing id argument */}
        <Link href={`/tasks/${task.id}/delete`}> Delete Task</Link> 
      </Button>
      <Button size="3" color="green">
        <Link href={`/tasks/${task.id}/edit`}> Edit Task</Link>
      </Button>
    </div>

    <div className="flex flex-wrap justify-center">
    <Flex gap="5" wrap="wrap" justify="center">
        <Box key={task.id} height="fit-content" width="550px" >
        <Card className="shadow-sm shadow-slate-900 bg-blue-100 hover:bg-blue-200" size="3" >
          <Box mb="2px" height="25px">{task.name}</Box>
          <Box mb="2px" overflow="auto" height="350px">{task.description}</Box>
          <Box mb="2px" height="25px">Due: {task.dueDate.toDateString()}</Box>
          <Box height="25px">{task.category}</Box>
        </Card>
        </Box>
    </Flex>
    </div>
    </>
  )
}

export default DetailedTask