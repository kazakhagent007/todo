import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const protectedRoutes = ['/dashboard'];

export function middleware(req: Request) {
  const token = cookies().get('token')?.value;
  const url = new URL(req.url);

  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
