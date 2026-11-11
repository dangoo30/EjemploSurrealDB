import { toRecordId } from "../database/recordId.js";
import * as songService from "../services/songService.js";
import { sendResponse } from "../utils/sendResponse.js";
import { validateGenreFilter, validateNewSong } from "../validators/songValidator.js";

export async function getSongs(req, res) {
  const songs = await songService.listSongs(validateGenreFilter(req.query.genre));
  sendResponse(res, "Canciones consultadas correctamente", songs);
}

export async function getSong(req, res) {
  const song = await songService.findSongDetail(toRecordId("song", req.params.songId));
  sendResponse(res, "Cancion consultada correctamente", song);
}

export async function postSong(req, res) {
  const created = await songService.createSong(validateNewSong(req.body));
  sendResponse(res, "Cancion creada correctamente", created, 201);
}
