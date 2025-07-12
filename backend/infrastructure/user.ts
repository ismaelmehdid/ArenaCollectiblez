import { faker } from '@faker-js/faker';
import { and, eq } from 'drizzle-orm';
import { err, ok, Result } from 'neverthrow';
import { db } from '../database/connection';
import { UserSelect, user } from '../database/schema';
import { User } from '../domain/types';

function rowToUser(row: UserSelect): User {
  if (!row) {
    throw new Error('Row is undefined or null');
  }
  return {
    id: row.id,
    walletAddress: row.wallet_address,
    avatar: row.avatar,
    userName: row.username,
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
