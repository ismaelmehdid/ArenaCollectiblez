import { faker } from '@faker-js/faker';
import { and, eq } from 'drizzle-orm';
import { err, ok, Result } from 'neverthrow';
import { db } from '../database/connection';
import { LootBoxSelect, UserSelect, lootBox, nft, user } from '../database/schema';
import { FullUser, NFT, User } from '../domain/types';

function rowToUser(row: UserSelect): User {
  if (!row) {
    throw new Error('Row is undefined or null');
  }
  return {
    id: row.id,
    walletAddress: row.wallet_address,
    avatar: row.avatar,
    userName: row.username,
    createdAt: row.createdAt,
  };
}

function rowToFullUser(UserRow: UserSelect, lootboxeRows: LootBoxSelect[], nfts: NFT[]): FullUser {
  if (!UserRow || !lootboxeRows) {
    throw new Error('Row is undefined or null');
  }
  return {
    id: UserRow.id,
    walletAddress: UserRow.wallet_address,
    avatar: UserRow.avatar,
    userName: UserRow.username,
    createdAt: UserRow.createdAt,
    lootBoxes: lootboxeRows.map((lootBox) => ({
      id: lootBox.id,
      type: lootBox.type,
      name: lootBox.name,
      image: lootBox.image,
    })),
    nfts: nfts.map((nft) => ({
      id: nft.id,
      index: nft.index,
      userId: nft.userId,
    })),
  };
}

export async function getOrCreateUser(
  walletAddress: string,
): Promise<Result<User, Error>> {
  try {
    const connected_user = await db
      .select()
      .from(user)
      .where(eq(user.wallet_address, walletAddress))
      .limit(1);
    if (connected_user.length > 0) {
      return ok(rowToUser(connected_user[0]));
    }
    const newUser = {
      id: crypto.randomUUID(),
      wallet_address: walletAddress,
      avatar: 'https://i.postimg.cc/02WbrwV5/avatar.png',
      username: faker.internet.userName(),
    };
    const newResult = await db.insert(user).values(newUser).returning();
    if (newResult.length > 0) {
      return ok(rowToUser(newResult[0]));
    }
  } catch (error) {
    console.error('Error getting or creating user:', error);
    return err(new Error('Failed to get or create user'));
  }
  return err(new Error('User not found or created'));
}

export async function veriftUer(
  userId: string,
  walletAddress: string,
): Promise<Result<boolean, Error>> {
  try {
    const requestUser = await db
      .select()
      .from(user)
      .where(and(eq(user.id, userId), eq(user.wallet_address, walletAddress)))
      .limit(1);
    if (requestUser.length > 0) {
      return ok(true);
    }
  } catch (error) {
    console.error('Error getting or creating user:', error);
    return err(new Error('Failed to verify user'));
  }
  return err(new Error('Failed to verify user'));
}

export async function getFullUser(
  userId: string,
): Promise<Result<FullUser, Error>> {
  try {
    const rows = await db
      .select()
      .from(user)
      .leftJoin(lootBox, eq(lootBox.user_id, user.id))
      .leftJoin(nft, eq(nft.user_id, user.id))
      .where(eq(user.id, userId));

    if (rows.length === 0 || !rows[0].user) {
      return err(new Error('User not found'));
    }

    const userRow = rows[0].user;
    const lootBoxes = rows
      .filter((r) => r.loot_box !== null)
      .map((r) => r.loot_box!);
    const nfts = rows
      .filter((r) => r.nft !== null)
      .map((r) => ({
        id: r.nft!.id,
        index: r.nft!.index,
        userId: r.nft!.user_id,
      })); 

    return ok(rowToFullUser(userRow, lootBoxes, nfts));
  } catch (error) {
    console.error('Error getting full user:', error);
    return err(new Error('Failed to get full user'));
  }
}


