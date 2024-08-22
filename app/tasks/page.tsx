import prisma from "@/prisma/client";
import Link from "next/link";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";

const TasksPage = async () => {
  const tasks = await prisma.task.findMany();

  return (
    <>
      <div className="flex py-3 space-x-3 justify-center">
      <Button size="3" >
        <Link href="/tasks/new"> Create a Task</Link>
      </Button>
      </div>

      <div className="flex flex-wrap justify-center">

        <Flex gap="5" wrap="wrap" justify="center">
        {tasks.map((task) => {
          return (
            <Box key={task.id} height="fit-content" width="450px" >
            <Card className="bg-blue-100 hover:bg-blue-200" size="3" >
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
  );
};

export default TasksPage;
