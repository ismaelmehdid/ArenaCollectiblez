import { err, ok, Result } from "neverthrow";
import { getPendingLootBox } from "../infrastructure/lootBox";
import { pusher } from "./pusher";

export async function checkPendingLootBox(
  userId: string,
): Promise<Result<boolean, Error>> {
  try {
    const isPending = await getPendingLootBox(userId);
    if (isPending.isErr()) {
      console.error('Error checking pending loot box:', isPending.error
        );
        return err(new Error('Failed to check pending loot box'));
    }
    if (isPending.value) {
          await pusher.trigger(`user-${userId}`, 'lootbox-received', {
            message: 'You received a lootbox!',
          });
          return ok(true);
    } else {
      return ok(false);
    }
  } catch (error) {
    console.error('Error checking pending loot box:', error);
    return err(new Error('Failed to check pending loot box'));
  }
}