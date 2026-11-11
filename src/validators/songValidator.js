import { HttpError } from "../errors/HttpError.js";
import { optionalPlainObject, requireText } from "./commonValidators.js";

const DURATION_PATTERN = /^(?=\d)(\d+h)?(\d+m)?(\d+s)?$/;

export function validateNewSong(body = {}) {
  const duration = requireText(body.duration, "duration", { maxLength: 12 });
  if (!DURATION_PATTERN.test(duration)) {
    throw new HttpError(400, "La duracion debe tener el formato 3m45s");
  }

  return {
    title: requireText(body.title, "title"),
    artist: requireText(body.artist, "artist"),
    genre: requireText(body.genre, "genre", { maxLength: 40 }).toLowerCase(),
    duration,
    metadata: optionalPlainObject(body.metadata, "metadata"),
  };
}

export function validateGenreFilter(genre) {
  return genre === undefined ? null : requireText(genre, "genre", { maxLength: 40 }).toLowerCase();
}
