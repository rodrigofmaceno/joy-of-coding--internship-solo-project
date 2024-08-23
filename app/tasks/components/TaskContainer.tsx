'use client';

import MyButton from '@/app/components/MyButton';
import { Task } from '@prisma/client';
import { Button, Flex, Box, Card } from '@radix-ui/themes';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

interface Props {
    tasks: Task[],
}

const TaskContainer = ({tasks}: Props) => {
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const filterTasks = (category: string) => {
        const taskArr: Task[] = [];
        tasks.map((item) => { if(item.category === category) {console.log("yes");taskArr.push(item)}});
        setFilteredTasks(taskArr);
      }

  return (
        <>
      <div className="flex py-3 space-x-3 justify-center">
      <Button size="3" >
        <Link href="/tasks/new"> Create a Task</Link>
      </Button>
      </div>
      
      <div className="'bg-sky-100 flex py-3 space-x-2 justify-center px-2 border-b mb-3">
        <div className="flex text-sm items-center animate-side-to-side">
          Click to filter &nbsp;<FaArrowRightLong size={15}/>
        </div>

        <MyButton onClick={() => setFilteredTasks(tasks)}>All</MyButton>

        {tasks.map((task)=> {return( 
            <MyButton key={task.id} onClick={() => filterTasks(String(task.category))}>
                {task.category}
            </MyButton>
        )})}
      </div>

      <div className="flex flex-wrap justify-center">
        <Flex gap="5" wrap="wrap" justify="center">
        {filteredTasks.map((task) => {
          return (
            <Box key={task.id} height="fit-content" width="450px" >
            <Card className="shadow-sm shadow-slate-900 bg-blue-100 hover:bg-blue-200" size="3" >
              <Box mb="2px" height="25px">{task.name}</Box>
              <Box mb="2px" overflow="auto" height="250px">{task.description}</Box>
              <Box mb="2px" height="25px">Due: {task.dueDate.toDateString()}</Box>
              <Box height="25px">{task.category}</Box>
            </Card>
            <div className="py-1 px-3"><Button variant="outline" ><Link href={`/tasks/${task.id}`}>See Actions</Link></Button></div>
            </Box>
          );
        })}
        </Flex>
      </div>
    </>
  )
}

export default TaskContainer