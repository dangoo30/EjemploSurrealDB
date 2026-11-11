import { getDatabase } from "../database/connection.js";
import { HttpError } from "../errors/HttpError.js";

export async function assertRecordExists(recordId, notFoundMessage) {
  const [exists] = await getDatabase().query("RETURN record::exists($id)", { id: recordId });
  if (!exists) {
    throw new HttpError(404, notFoundMessage);
  }
}
