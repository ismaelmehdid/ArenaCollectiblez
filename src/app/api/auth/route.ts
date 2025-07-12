import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '../../../../backend/infrastructure/user';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { wallet } = body;

  if (typeof wallet !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    return NextResponse.json(
      { error: 'Invalid wallet address' },
      { status: 400 },
    );
  }

  const cookie = serialize('wallet', wallet, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  const user = await getOrCreateUser(wallet);
  if (user.isErr()) {
    console.error('Failed to get or create user:', user.error);
    return NextResponse.json(
      { error: 'Failed to get or create user' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
      },
    },
  );
}
