import { validateUser } from '../../../db/auth';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const { token, user } = await loginUser(username, password);
    return new Response(JSON.stringify({ token, user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    return false;
  }
}

async function loginUser(username, password) {
  const user = await validateUser(username, password);
  if (!user) {
    throw new Error('用户名或密码错误');
  }

  const token = jwt.sign(
    { userId: user.id, username: user.name },
    secretKey,
    { expiresIn: '1h' }
  );

  return { token, user };
}
