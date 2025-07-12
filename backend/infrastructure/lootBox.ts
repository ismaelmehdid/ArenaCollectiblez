import 'server-only';
import { err, ok, Result } from 'neverthrow';
import { db } from '../database/connection';
import { loobBoxType, lootBox, lootBoxPending } from '../database/schema';

export async function addLootBoxToUser(
  userId: string,
  type: loobBoxType,
): Promise<Result<boolean, Error>> {
  try {
    let image: string;
    if (type === loobBoxType.BlazehartSC) {
      image = 'https://i.postimg.cc/8czTKbV9/loot-Box-Blaze-Heart.png';
    } else {
      image = 'https://i.postimg.cc/ydVKxTWx/loot-Box-Storm-Fox.png';
    }

    await db.insert(lootBox).values({
      id: crypto.randomUUID(),
      name: 'Stormfox FC vs. Blazehart SC',
      user_id: userId,
      description:
        'Exclusive loot box for Stormfox FC vs. Blazehart SC 2025 match.',
      image: image,
      type: type,
      price_to_open: 1,
      createdAt: new Date().toISOString(),
    });
    return ok(true);
  } catch (error) {
    console.error('Error getting or creating user:', error);
    return err(new Error('Failed to get or create user'));
  }
}

export async function addPendingLootBox(
  userId: string,
): Promise<Result<boolean, Error>> {
  try {
    await db.insert(lootBoxPending).values({
      id: crypto.randomUUID(),
      user_id: userId,
    });
    return ok(true);
  } catch (error) {
    console.error('Error adding pending loot box:', error);
    return err(new Error('Failed to add pending loot box'));
  }
}
