import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/shared/utils/auth';

const prisma = new PrismaClient();

// GET all todos for the authenticated user
export async function GET(req: Request) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
export async function POST(req: Request) {
  const user = verifyToken(req);
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

// UPDATE a todo (PUT)
export async function PUT(req: Request) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, title, description } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    // Ensure the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo || existingTodo.authorId !== user.id) {
      return NextResponse.json({ error: 'Todo not found or access denied' }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

// DELETE a todo (DELETE)
export async function DELETE(req: Request) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    // Ensure the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo || existingTodo.authorId !== user.id) {
      return NextResponse.json({ error: 'Todo not found or access denied' }, { status: 404 });
    }

    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
