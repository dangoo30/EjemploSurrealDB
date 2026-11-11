import { getDatabase } from "../database/connection.js";
import { HttpError } from "../errors/HttpError.js";

export async function createRelation(fromId, edgeTable, toId) {
  const [relation] = await getDatabase().query(
    "RELATE ONLY $from->(type::table($edge))->$to",
    { from: fromId, edge: edgeTable, to: toId },
  );
  return relation;
}

export async function deleteRelation(fromId, edgeTable, toId, notFoundMessage) {
  const [deleted] = await getDatabase().query(
    "DELETE type::table($edge) WHERE in = $from AND out = $to RETURN BEFORE",
    { from: fromId, edge: edgeTable, to: toId },
  );
  if (deleted.length === 0) {
    throw new HttpError(404, notFoundMessage);
  }
}
