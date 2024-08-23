import prisma from "@/prisma/client";
import TaskContainer from "./components/TaskContainer";

const TasksPage = async () => {
  const tasks = await prisma.task.findMany();

  return (
    <TaskContainer tasks={tasks}/>
  );
};

export default TasksPage;
