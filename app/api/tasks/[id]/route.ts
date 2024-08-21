import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET( { params }: { params: { id: string } }) {
    
    const result = await prisma.task.findUnique({
        where: {
          id: parseInt(params.id),
        },
      })

    return NextResponse.json(result, {status: 200});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: string} }) {

  const deleteTask = await prisma.task.delete({
    where: {
      id: parseInt(params.id),
    },
  })

  return NextResponse.json(deleteTask, {status: 200})
}

export async function PATCH(request: NextRequest, {params}: { params: { id: string} }) {

  const body = await request.json();
  
  const patchTask = await prisma.task.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      name: body.name,
      description: body.description,
      dueDate: body.dueDate,
      category: body.category
    }
  })

  return NextResponse.json(patchTask, {status: 200})
}