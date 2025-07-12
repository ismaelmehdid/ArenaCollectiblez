import 'server-only'; 
import { err, ok, Result } from "neverthrow";
import { db } from "../database/connection";
import { nft, NFTSelect } from "../database/schema";
import { NFT } from "../domain/types";
import { eq } from "drizzle-orm";

export async function addNftToUser(
  index: number,
  userId: string,
): Promise<Result<boolean, Error>> {
  try {
    // Assuming there's a function to add an NFT to a user
    await db.insert(nft).values({
      index,
      user_id: userId,
    });
    return ok(true);
  } catch (error) {
    console.error('Error adding NFT to user:', error);
    return err(new Error('Failed to add NFT to user'));
  }
}

function rowToNft(row: NFTSelect): NFT {
  return {
    id: row.id,
    index: row.index,
    userId: row.user_id,
  };
}

export async function getAllUserNfts(userId: string): Promise<Result<NFT[], Error>> {
  try {
    const result = await db.select().from(nft).where(eq(nft.user_id, userId));
    const nfts = result.map(rowToNft);
    if (nfts.length === 0) {
      return ok([]);
    }
    return ok(nfts);
  } catch (error) {
    console.error('Error fetching user NFTs:', error);
    return err(new Error('Failed to fetch user NFTs'));
  }
}