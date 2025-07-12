'use server';

import { err, ok, Result } from 'neverthrow';
import { cookies } from 'next/headers';
import { getOrCreateUser } from '../infrastructure/user';
import { User } from './types';

export async function getAuthorizedUser(): Promise<Result<User, Error>> {
  const cookieStore = await cookies();
  const wallet = cookieStore.get('wallet')?.value;

  if (typeof wallet !== 'string')
    return err(new Error('Invalid wallet address'));
  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet))
    return err(new Error('Invalid wallet address format'));

  const user = await getOrCreateUser(wallet);
  if (user.isErr()) {
    console.error('Failed to get or create user:', user.error);
    return err(new Error('Failed to get or create user'));
  }
  return ok(user.value);
}
