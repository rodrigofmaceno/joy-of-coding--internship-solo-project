import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createTaskSchema } from "../../createTaskSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});

    if (!body.category) 
        body.category = null; // remove empty strings
    
    const newTask = await prisma.task.create(
        {
        data: {name: body.name, description: body.description, dueDate: body.dueDate, category: body.category}
    });
    
    return NextResponse.json(newTask, {status: 201});

}

export async function GET() {
    
    const tasks = await prisma.task.findMany();

    return NextResponse.json(tasks, {status: 200});
}