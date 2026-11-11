import { HttpError } from "../errors/HttpError.js";
import { assertRecordExists } from "./recordService.js";
import { createRelation, deleteRelation } from "./relationService.js";

const FOLLOW_TABLE = "follows";

export async function followUser(followerId, followedId) {
  if (followerId.equals(followedId)) {
    throw new HttpError(400, "Un usuario no puede seguirse a si mismo");
  }
  await assertRecordExists(followerId, "El usuario no existe");
  await assertRecordExists(followedId, "El usuario a seguir no existe");
  return createRelation(followerId, FOLLOW_TABLE, followedId);
}

export async function unfollowUser(followerId, followedId) {
  await deleteRelation(followerId, FOLLOW_TABLE, followedId, "El usuario no sigue a esa persona");
}
