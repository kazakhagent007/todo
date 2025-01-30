import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Store in .env

export function verifyToken(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = parse(cookieHeader);
  const token = cookies.token; // Ensure your frontend sends the token in a "token" cookie

  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
