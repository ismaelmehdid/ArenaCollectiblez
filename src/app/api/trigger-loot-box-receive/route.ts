import { NextRequest, NextResponse } from 'next/server';
import { pusher } from '../../../../backend/domain/pusher';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  await pusher.trigger(`user-${userId}`, 'lootbox-received', {
    message: 'You received a lootbox!',
  });

  return NextResponse.json(
    { success: true },
    {
      status: 200,
    },
  );
}