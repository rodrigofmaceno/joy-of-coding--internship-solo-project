import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import prisma from "@/prisma/client";

const createTaskSchema = z.object({

    name: z.string().min(1).max(191),
    description: z.string().min(1),
    dueDate: z.coerce.date().min(new Date()),
    category: z.string().min(1).max(191).optional()
})

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});

    const newTask = await prisma.task.create({
        data: {name: body.name, description: body.description, dueDate: new Date(body.dueDate), category: body.category}
    });

    return NextResponse.json(newTask, {status: 201});
}

export async function GET() {
    
    const tasks = await prisma.task.findMany();

    return NextResponse.json(tasks, {status: 200});
}