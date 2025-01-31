import { verifyToken } from '@/shared/utils/auth';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const { title, description, completed } = await req.json(); // Parse body as JSON
    console.log(id, title, description, completed);
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    // Ensure the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    const userId = (user as { id: string }).id;

    if (!existingTodo || existingTodo.authorId !== userId) {
      return NextResponse.json({ error: 'Todo not found or access denied' }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description, completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    // Ensure the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    const userId = (user as { id: string }).id;

    if (!existingTodo || existingTodo.authorId !== userId) {
      return NextResponse.json({ error: 'Todo not found or access denied' }, { status: 404 });
    }

    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
