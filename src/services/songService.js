import { getDatabase } from "../database/connection.js";
import { HttpError } from "../errors/HttpError.js";

export async function listSongs(genre) {
  const filter = genre ? "WHERE genre = $genre" : "";
  const [songs] = await getDatabase().query(
    `SELECT *, count(<-likes) AS totalLikes FROM song ${filter}
     ORDER BY totalLikes DESC, title ASC`,
    { genre },
  );
  return songs;
}

export async function findSongDetail(songId) {
  const [song] = await getDatabase().query(
    "SELECT *, <-likes<-user.username AS likedBy FROM ONLY $song",
    { song: songId },
  );
  if (!song) {
    throw new HttpError(404, "La cancion no existe");
  }
  return song;
}

export async function createSong(songData) {
  const [created] = await getDatabase().query(
    `CREATE ONLY song CONTENT {
      title: $song.title,
      artist: $song.artist,
      genre: $song.genre,
      duration: <duration>$song.duration,
      metadata: $song.metadata
    }`,
    { song: songData },
  );
  return created;
}
