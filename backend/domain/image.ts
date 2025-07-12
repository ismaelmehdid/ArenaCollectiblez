'use server';

import {
  CanvasRenderingContext2D,
  createCanvas,
  Image,
  loadImage,
} from 'canvas';
import { err, ok, Result } from 'neverthrow';
import { PinataSDK } from 'pinata';
import {
  ASSET_COUNTS,
  ASSET_PATHS,
  RARITY_WEIGHTS,
  RENDERING_CONFIG,
} from './config';
import { ImageRarity, NFTImage } from './types';

// Types for better type safety
type AssetType = 'frame' | 'ball' | 'pattern' | 'filter' | 'logo';
type AssetPath = string;

interface AssetConfig {
  type: AssetType;
  path: AssetPath;
}

interface RenderingPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Error types for better error handling
class ImageGenerationError extends Error {
  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'ImageGenerationError';
    if (cause) this.cause = cause;
  }
}

class AssetLoadingError extends ImageGenerationError {
  constructor(assetType: string, cause?: Error) {
    super(`Failed to load ${assetType} asset`, cause);
    this.name = 'AssetLoadingError';
  }
}

// Asset path generation utilities
const AssetPathGenerator = {
  getFramePath(rarity: ImageRarity): string {
    return `${ASSET_PATHS.FRAMES}/${rarity}.png`;
  },

  getBallPath(): string {
    return `${ASSET_PATHS.BALLS}/generic_ball.png`;
  },

  getPatternPath(): string {
    const patternNumber = Math.floor(Math.random() * ASSET_COUNTS.PATTERNS) + 1;
    return `${ASSET_PATHS.BACKGROUND_PATTERNS}/pattern${patternNumber}.png`;
  },

  getFilterPath(): string {
    return `${ASSET_PATHS.FILTERS}/filter1.png`;
  },

  getLogoPath(): string {
    const logoNumber = Math.floor(Math.random() * ASSET_COUNTS.LOGOS) + 1;
    return `${ASSET_PATHS.LOGOS}/logo${logoNumber}.png`;
  },

  getAllPaths(rarity: ImageRarity): AssetConfig[] {
    return [
      { type: 'frame', path: AssetPathGenerator.getFramePath(rarity) },
      { type: 'ball', path: AssetPathGenerator.getBallPath() },
      { type: 'pattern', path: AssetPathGenerator.getPatternPath() },
      { type: 'filter', path: AssetPathGenerator.getFilterPath() },
      { type: 'logo', path: AssetPathGenerator.getLogoPath() },
    ];
  },
};

// Image loading service
const ImageLoader = {
  async loadImageElement(src: string): Promise<Result<Image, Error>> {
    try {
      const img = await loadImage(src);
      return ok(img);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return err(
        new AssetLoadingError(
          `image from ${src}`,
          error instanceof Error ? error : undefined,
        ),
      );
    }
  },

  async loadImages(assets: AssetConfig[]): Promise<Result<Image[], Error>> {
    const loadPromises = assets.map(async (asset) => {
      const result = await ImageLoader.loadImageElement(asset.path);
      return result.mapErr((error) => new AssetLoadingError(asset.type, error));
    });

    const results = await Promise.all(loadPromises);

    // Check if any failed
    const failedResults = results.filter((result) => result.isErr());
    if (failedResults.length > 0) {
      const firstError = failedResults[0].error;
      return err(
        new ImageGenerationError(
          'Failed to load one or more assets',
          firstError,
        ),
      );
    }

    // Extract successful results - we know all are Ok at this point
    const images = results.map((result) => {
      if (result.isOk()) {
        return result.value;
      }
      throw new Error('Unexpected error state');
    });
    return ok(images);
  },
};

// Rarity generation service
const RarityGenerator = {
  generateRarity(): ImageRarity {
    const random = Math.floor(Math.random() * 100);
    let cumulativeWeight = 0;

    for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
      cumulativeWeight += weight;
      if (random < cumulativeWeight) {
        return rarity as ImageRarity;
      }
    }

    return 'common'; // Fallback
  },
};

// Canvas rendering service
class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(width: number, height: number) {
    const canvas = createCanvas(width, height);
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  private drawBackgroundPattern(patternImage: Image): void {
    const patternWidth = patternImage.width;
    const patternHeight = patternImage.height;

    const maxStartX = Math.max(0, patternWidth - this.canvasWidth);
    const maxStartY = Math.max(0, patternHeight - this.canvasHeight);

    const startX = Math.floor(Math.random() * (maxStartX + 1));
    const startY = Math.floor(Math.random() * (maxStartY + 1));

    this.ctx.drawImage(
      patternImage,
      startX,
      startY,
      this.canvasWidth,
      this.canvasHeight,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    );
  }

  private calculateBallPosition(): RenderingPosition {
    const frameCenterX = this.canvasWidth / 2;
    const frameCenterY =
      this.canvasHeight / 2 - RENDERING_CONFIG.FRAME_CENTER_OFFSET_Y;

    const ballX = frameCenterX - RENDERING_CONFIG.BALL_SIZE / 2;
    const ballY = frameCenterY - RENDERING_CONFIG.BALL_SIZE / 2;

    return {
      x: ballX,
      y: ballY,
      width: RENDERING_CONFIG.BALL_SIZE,
      height: RENDERING_CONFIG.BALL_SIZE,
    };
  }

  private calculateLogoPosition(
    ballPosition: RenderingPosition,
  ): RenderingPosition {
    const logoX =
      ballPosition.x +
      (RENDERING_CONFIG.BALL_SIZE - RENDERING_CONFIG.LOGO_SIZE) / 2;
    const logoY =
      ballPosition.y +
      (RENDERING_CONFIG.BALL_SIZE - RENDERING_CONFIG.LOGO_SIZE) / 2 -
      RENDERING_CONFIG.LOGO_OFFSET_Y;

    return {
      x: logoX,
      y: logoY,
      width: RENDERING_CONFIG.LOGO_SIZE,
      height: RENDERING_CONFIG.LOGO_SIZE,
    };
  }

  render(
    frameImage: Image,
    ballImage: Image,
    patternImage: Image,
    filterImage: Image,
    logoImage: Image,
  ): Buffer {
    // Draw background pattern
    this.drawBackgroundPattern(patternImage);

    // Calculate positions
    const ballPosition = this.calculateBallPosition();
    const logoPosition = this.calculateLogoPosition(ballPosition);

    // Draw ball
    this.ctx.drawImage(
      ballImage,
      ballPosition.x,
      ballPosition.y,
      ballPosition.width,
      ballPosition.height,
    );

    // Draw logo
    this.ctx.drawImage(
      logoImage,
      logoPosition.x,
      logoPosition.y,
      logoPosition.width,
      logoPosition.height,
    );

    // Draw filter overlay
    this.ctx.drawImage(filterImage, 0, 0, this.canvasWidth, this.canvasHeight);

    // Draw frame (top layer)
    this.ctx.drawImage(frameImage, 0, 0, this.canvasWidth, this.canvasHeight);

    return this.ctx.canvas.toBuffer('image/png');
  }
}

// Main image generation service
const NFTImageGenerator = {
  async generateRandomImage(): Promise<Result<NFTImage, Error>> {
    try {
      const rarity = RarityGenerator.generateRarity();
      const assets = AssetPathGenerator.getAllPaths(rarity);

      const imageResults = await ImageLoader.loadImages(assets);
      if (imageResults.isErr()) {
        return err(imageResults.error);
      }

      const [frameImage, ballImage, patternImage, filterImage, logoImage] =
        imageResults.value;

      const renderer = new CanvasRenderer(frameImage.width, frameImage.height);
      const imageBuffer = renderer.render(
        frameImage,
        ballImage,
        patternImage,
        filterImage,
        logoImage,
      );

      return ok({
        rarity,
        image: imageBuffer,
        cid: '',
      });
    } catch (error) {
      return err(
        new ImageGenerationError(
          'Failed to generate NFT image',
          error instanceof Error ? error : undefined,
        ),
      );
    }
  },
};

const NFTRepository = {
  // Uploads the image to IPFS and returns the CID
  async uploadImageToIpfs(image: NFTImage): Promise<Result<string, Error>> {
    const pinataJwt = process.env.PINATA_JWT;
    if (!pinataJwt) {
      return err(new Error('PINATA_JWT is not set'));
    }
    const client = new PinataSDK({
      pinataJwt: pinataJwt,
      pinataGateway: 'https://white-obliged-dormouse-170.mypinata.cloud',
    });

    const file = new File([image.image], 'image.png', { type: 'image/png' });
    const upload = await client.upload.public.file(file);
    return ok(upload.cid);
  },

  async generateNFT(image: NFTImage): Promise<Result<string, Error>> {
    const uploadImageToIpfsResult =
      await NFTRepository.uploadImageToIpfs(image);
    if (uploadImageToIpfsResult.isErr()) {
      return err(uploadImageToIpfsResult.error);
    }
    const cid = uploadImageToIpfsResult.value;
    return ok(cid);
  },
};

// Public API - maintain backward compatibility
export async function generateRandomImage(): Promise<Result<NFTImage, Error>> {
  const generateRandomImageResult =
    await NFTImageGenerator.generateRandomImage();
  if (generateRandomImageResult.isErr()) {
    return err(generateRandomImageResult.error);
  }
  const image = generateRandomImageResult.value;
  console.log('image', image);
  const generateNFTResult = await NFTRepository.generateNFT(image);
  if (generateNFTResult.isErr()) {
    return err(generateNFTResult.error);
  }
  image.cid = generateNFTResult.value;
  return ok(image);
}
