import { toRecordId } from "../database/recordId.js";
import * as likeService from "../services/likeService.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function getLikes(req, res) {
  const songs = await likeService.listLikedSongs(toRecordId("user", req.params.userId));
  sendResponse(res, "Canciones favoritas consultadas correctamente", songs);
}

export async function postLike(req, res) {
  const like = await likeService.addLike(
    toRecordId("user", req.params.userId),
    toRecordId("song", req.body?.songId),
  );
  sendResponse(res, "Like registrado correctamente", like, 201);
}

export async function deleteLike(req, res) {
  await likeService.removeLike(
    toRecordId("user", req.params.userId),
    toRecordId("song", req.params.songId),
  );
  sendResponse(res, "Like eliminado correctamente");
}
