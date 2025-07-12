'use server';

import { LootBoxType } from "../database/schema";
import { getAuthorizedUser } from "../domain/auth";
import { addLootBoxToUser } from "../infrastructure/lootBox";

export async function fetchReceiveLootBox(
  lootBoxType: LootBoxType
): Promise<boolean> {
  const user = await getAuthorizedUser();

  if (user.isErr()) {
    return false;
  }

  const receiveResult = await addLootBoxToUser(user.value.id, lootBoxType);

  if (receiveResult.isErr()) {
    return false;
  }

  return true;
}