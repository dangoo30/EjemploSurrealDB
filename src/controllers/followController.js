import { toRecordId } from "../database/recordId.js";
import * as followService from "../services/followService.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function postFollowing(req, res) {
  const relation = await followService.followUser(
    toRecordId("user", req.params.userId),
    toRecordId("user", req.body?.userId),
  );
  sendResponse(res, "Ahora sigues a este usuario", relation, 201);
}

export async function deleteFollowing(req, res) {
  await followService.unfollowUser(
    toRecordId("user", req.params.userId),
    toRecordId("user", req.params.followedId),
  );
  sendResponse(res, "Dejaste de seguir a este usuario");
}
