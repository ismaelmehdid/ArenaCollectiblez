import { NextResponse } from 'next/server';
import { generateRandomImage } from '../../../../backend/domain/image';

export async function GET() {
  try {
    const result = await generateRandomImage();

    if (result.isOk()) {
      const { cid } = result.value;
      return NextResponse.json({ cid });
    } else {
      return NextResponse.json(
        { error: 'Failed to generate image and upload to IPFS' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error generating random image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
} 