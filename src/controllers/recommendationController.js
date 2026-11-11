import { toRecordId } from "../database/recordId.js";
import { recommendSongs } from "../services/recommendationService.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function getRecommendations(req, res) {
  const recommendations = await recommendSongs(toRecordId("user", req.params.userId));
  sendResponse(res, "Recomendaciones generadas correctamente", recommendations);
}
