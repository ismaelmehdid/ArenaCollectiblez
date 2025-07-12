import { z } from 'zod';

export enum Rarity {
  Common = 'Common',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
}

export const sampleNFTs = [
  {
    id: '1',
    name: 'Cosmic Guardian',
    rarity: Rarity.Common,
    price: 0.5,
    seller: 'CryptoFan23',
  },
  {
    id: '2',
    name: 'Storm Rider',
    rarity: Rarity.Rare,
    price: 2.1,
    seller: 'NFTCollector',
  },
  {
    id: '3',
    name: 'Shadow Walker',
    rarity: Rarity.Epic,
    price: 8.5,
    seller: 'GameMaster',
  },
  {
    id: '4',
    name: 'Phoenix Lord',
    rarity: Rarity.Legendary,
    price: 25.0,
    seller: 'LegendSeeker',
  },
  {
    id: '5',
    name: 'Ice Crystal',
    rarity: Rarity.Common,
    price: 1.8,
    seller: 'FrostByte',
  },
  {
    id: '6',
    name: 'Fire Demon',
    rarity: Rarity.Rare,
    price: 12.3,
    seller: 'BlazeRunner',
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
});

export type User = z.infer<typeof UserSchema>;
