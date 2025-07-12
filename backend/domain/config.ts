// Configuration for NFT image generation
export const ASSET_PATHS = {
  FRAMES: 'public/nft_assets/frames',
  BALLS: 'public/nft_assets/balls',
  BACKGROUND_PATTERNS: 'public/nft_assets/background_patterns',
  FILTERS: 'public/nft_assets/filter',
  LOGOS: 'public/nft_assets/logos',
} as const;

export const RARITY_WEIGHTS = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3,
} as const;

export const RENDERING_CONFIG = {
  BALL_SIZE: 800,
  LOGO_SIZE: 100,
  FRAME_CENTER_OFFSET_Y: 75,
  LOGO_OFFSET_Y: 100,
} as const;

export const ASSET_COUNTS = {
  PATTERNS: 4,
  LOGOS: 6,
} as const;

// Validation functions
export function isValidRarity(
  rarity: string,
): rarity is keyof typeof RARITY_WEIGHTS {
  return rarity in RARITY_WEIGHTS;
}

export function getTotalWeight(): number {
  return Object.values(RARITY_WEIGHTS).reduce((sum, weight) => sum + weight, 0);
}
