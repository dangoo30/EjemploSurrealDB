import { RecordId } from "surrealdb";
import { HttpError } from "../errors/HttpError.js";

const KEY_PATTERN = /^[A-Za-z0-9_]{1,64}$/;

export function toRecordId(table, rawId) {
  const key = String(rawId ?? "")
    .replace(`${table}:`, "")
    .replace(/[⟨⟩`]/g, "");

  if (!KEY_PATTERN.test(key)) {
    throw new HttpError(400, `El identificador de ${table} no es valido`);
  }

  return new RecordId(table, key);
}
