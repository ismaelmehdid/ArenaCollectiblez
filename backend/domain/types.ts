import { z } from 'zod';
import { LootBoxType } from '../database/schema';

export enum Rarity {
  Common = 'Common',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
}

export type ImageRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type NFTImage = {
  rarity: ImageRarity;
  image: Buffer;
  cid: string;
};


export const sampleNFTs = [
    {
    id: '1',
    name: 'Phoenix Lord',
    rarity: Rarity.Legendary,
    price: 2500,
    seller: 'LegendSeeker',
    image: '/sample-nft-1.png',
  },
  {
    id: '2',
    name: 'Ice Crystal',
    rarity: Rarity.Common,
    price: 6,
    seller: 'FrostByte',
    image: '/sample-nft-6.png',
  },
  {
    id: '3',
    name: 'Fire Demon',
    rarity: Rarity.Epic,
    price: 120,
    seller: 'BlazeRunner',
    image: '/sample-nft-5.png',
  },
  {
    id: '4',
    name: 'Cosmic Guardian',
    rarity: Rarity.Common,
    price: 3,
    seller: 'CryptoFan23',
    image: '/sample-nft-2.png',
  },
  {
    id: '5',
    name: 'Storm Rider',
    rarity: Rarity.Rare,
    price: 25,
    seller: 'NFTCollector',
    image: '/sample-nft-4.png',
  },
  {
    id: '6',
    name: 'Shadow Walker',
    rarity: Rarity.Epic,
    price: 178,
    seller: 'GameMaster',
    image: '/sample-nft-3.png',
  },
];

export const rarityConfig = {
  Common: {
    gradient: 'from-gray-400 to-gray-600',
    color: 'text-gray-400',
    chance: 60,
  },
  Rare: {
    gradient: 'from-blue-400 to-blue-600',
    color: 'text-blue-400',
    chance: 30,
  },
  Epic: {
    gradient: 'from-purple-400 to-purple-600',
    color: 'text-purple-400',
    chance: 9.5,
  },
  Legendary: {
    gradient: 'from-yellow-400 to-yellow-600',
    color: 'text-yellow-400',
    chance: 0.5,
  },
};

export const rarities = [
  { name: 'Common', color: 'from-gray-400 to-gray-600', chance: 60 },
  { name: 'Rare', color: 'from-blue-400 to-blue-600', chance: 30 },
  { name: 'Epic', color: 'from-purple-400 to-purple-600', chance: 9.5 },
  { name: 'Legendary', color: 'from-yellow-400 to-yellow-600', chance: 0.5 },
];

export const UserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  avatar: z.string(),
  walletAddress: z.string().optional(),
  createdAt: z.string(),
});

export const LootBoxSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(LootBoxType),
  name: z.string(),
  image: z.string(),
});

export type LootBox = z.infer<typeof LootBoxSchema>;

export type User = z.infer<typeof UserSchema>;

export type FullUser = User & {
  lootBoxes: LootBox[];
};
