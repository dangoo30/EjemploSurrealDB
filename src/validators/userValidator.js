import { HttpError } from "../errors/HttpError.js";
import { optionalTextList, requireText } from "./commonValidators.js";

const USERNAME_PATTERN = /^[a-z0-9_]{3,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateNewUser(body = {}) {
  const username = requireText(body.username, "username", { maxLength: 30 }).toLowerCase();
  if (!USERNAME_PATTERN.test(username)) {
    throw new HttpError(400, "El username solo admite minusculas, numeros y guion bajo (3 a 30 caracteres)");
  }

  const email = requireText(body.email, "email").toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    throw new HttpError(400, "El email no tiene un formato valido");
  }

  return {
    username,
    email,
    favoriteGenres: optionalTextList(body.favoriteGenres, "favoriteGenres"),
  };
}
