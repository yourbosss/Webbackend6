import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const options: SignOptions = {
  // Приводим к any, чтобы TS не ругался
  expiresIn: JWT_EXPIRES_IN as any,
};

export const generateToken = (userId: string, role: string): string => {
  const payload = { userId, role };
  return jwt.sign(payload, JWT_SECRET, options);
};
