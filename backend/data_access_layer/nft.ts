import { getAuthorizedUser } from "../domain/auth";
import { addNftToUser, getAllUserNfts } from "../infrastructure/nft";
import { NFT } from "../domain/types";

export async function fetchAddNftToUser(
  index: number,
): Promise<boolean> {
  const user = await getAuthorizedUser();
  if (user.isErr()) {
    return false;
  }
  const addNftResult = await addNftToUser(index, user.value.id);
  if (addNftResult.isErr()) {
    return false;
  }
  return addNftResult.value;
}

export async function fetchAllUserNfts(): Promise<NFT[]> {
  const user = await getAuthorizedUser();
  if (user.isErr()) {
    return [];
  }
  const nfts = await getAllUserNfts(user.value.id);
  if (nfts.isErr()) {
    return [];
  }
  return nfts.value;
}