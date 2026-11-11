import { getDatabase } from "../database/connection.js";
import { toRecordId } from "../database/recordId.js";
import { HttpError } from "../errors/HttpError.js";

export async function listUsers() {
  const [users] = await getDatabase().query(`
    SELECT id, username, email, favoriteGenres,
      count(->follows) AS followingCount,
      count(<-follows) AS followersCount
    FROM user ORDER BY username
  `);
  return users;
}

export async function findUserProfile(userId) {
  const [profile] = await getDatabase().query(
    `SELECT *,
      ->follows->user.username AS following,
      <-follows<-user.username AS followers,
      ->likes->song.title AS likedSongs
    FROM ONLY $user`,
    { user: userId },
  );
  if (!profile) {
    throw new HttpError(404, "El usuario no existe");
  }
  return profile;
}

export async function createUser(userData) {
  const [created] = await getDatabase().query("CREATE ONLY $user CONTENT $data", {
    user: toRecordId("user", userData.username),
    data: userData,
  });
  return created;
}
