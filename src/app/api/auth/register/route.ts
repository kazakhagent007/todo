import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({ data: { email, password: hashedPassword } });

        return NextResponse.json({ message: 'User registered' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
}
