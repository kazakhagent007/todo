import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/shared/utils/auth';

const prisma = new PrismaClient();

// GET all todos for the authenticated user
export async function GET(req: NextRequest) {
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  console.log(user);
  try {
    const todos = await prisma.todo.findMany({
      where: { authorId: user.id }, // Fetch only user's todos
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

// CREATE a new todo (POST)
export async function POST(req: NextRequest) {
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, description } = await req.json();

    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || '',
        authorId: user.id, // Ensure the todo is linked to the user
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}
