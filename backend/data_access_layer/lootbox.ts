'use server';

import { LootBoxType } from "../database/schema";
import { getAuthorizedUser } from "../domain/auth";
import { addLootBoxToUser, deleteLootBoxById } from "../infrastructure/lootBox";

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

export async function fetchDeleteLootBox(
  lootBoxId: string
): Promise<boolean> {
  const user = await getAuthorizedUser();

  if (user.isErr()) {
    return false;
  }

  const deleteResult = await deleteLootBoxById(user.value.id, lootBoxId);

  if (deleteResult.isErr()) {
    return false;
  }

  return true;
}