import { config } from "../config/env.js";
import { getDatabase } from "../database/connection.js";
import { assertRecordExists } from "./recordService.js";

export async function recommendSongs(userId) {
  await assertRecordExists(userId, "El usuario no existe");
  const [recommendations] = await getDatabase().query(
    `SELECT out AS song, count() AS score, array::distinct(in.username) AS likedBy
     FROM likes
     WHERE in INSIDE $user->follows->user
       AND out NOTINSIDE $user->likes->song
     GROUP BY song
     ORDER BY score DESC
     LIMIT $limit
     FETCH song`,
    { user: userId, limit: config.recommendationLimit },
  );
  return recommendations;
}
