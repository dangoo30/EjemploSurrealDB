import { HttpError } from "../errors/HttpError.js";

export function requireText(value, fieldName, { maxLength = 120 } = {}) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new HttpError(400, `El campo ${fieldName} es obligatorio`);
  }
  const text = value.trim();
  if (text.length > maxLength) {
    throw new HttpError(400, `El campo ${fieldName} supera los ${maxLength} caracteres`);
  }
  return text;
}

export function optionalTextList(value, fieldName) {
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    throw new HttpError(400, `El campo ${fieldName} debe ser una lista de textos`);
  }
  return value.map((item) => item.trim().toLowerCase());
}

export function optionalPlainObject(value, fieldName) {
  if (value === undefined) {
    return {};
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new HttpError(400, `El campo ${fieldName} debe ser un objeto`);
  }
  return value;
}
