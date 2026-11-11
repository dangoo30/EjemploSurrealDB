import { getDatabase } from "../database/connection.js";
import { assertRecordExists } from "./recordService.js";
import { createRelation, deleteRelation } from "./relationService.js";

const LIKE_TABLE = "likes";

export async function listLikedSongs(userId) {
  await assertRecordExists(userId, "El usuario no existe");
  const [songs] = await getDatabase().query(
    "SELECT * FROM song WHERE <-likes<-user CONTAINS $user ORDER BY title",
    { user: userId },
  );
  return songs;
}

export async function addLike(userId, songId) {
  await assertRecordExists(userId, "El usuario no existe");
  await assertRecordExists(songId, "La cancion no existe");
  return createRelation(userId, LIKE_TABLE, songId);
}

export async function removeLike(userId, songId) {
  await deleteRelation(userId, LIKE_TABLE, songId, "El usuario no tiene un like en esa cancion");
}
