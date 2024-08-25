import prisma from "@/prisma/client";
import TaskContainer from "./components/TaskContainer";

const TasksPage = async () => {
  const tasks = await prisma.task.findMany();
  
  const categories: any[] = [];
  
  tasks.map((task) => {  if(!(categories.includes(task.category))) categories.push(task.category);})

  return (
    <TaskContainer tasks={tasks} categories={categories}/>
  );
};

export default TasksPage;
