import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, message } = body;

  const wsUrl = `ws://localhost:3001/`;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);

    ws.on('open', () => {
      ws.send(message);
      ws.close();

      resolve(
        NextResponse.json({ success: true, info: 'Message sent' }, { status: 200 }),
      );
    });

    ws.on('error', (error) => {
      console.error('WS Client error:', error);
      resolve(
        NextResponse.json({ error: 'Failed to connect to WS server' }, { status: 500 }),
      );
    });
  });
}