import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if both email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data in the database
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}
