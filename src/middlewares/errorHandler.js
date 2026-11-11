import { HttpError } from "../errors/HttpError.js";

const DATABASE_ERROR_RULES = [
  { pattern: /already (contains|exists)/i, status: 409, message: "El registro ya existe" },
  { pattern: /must conform|couldn't coerce|no such field exists/i, status: 400, message: "Los datos no cumplen el esquema de la base de datos" },
];

function resolveDatabaseError(error) {
  const rule = DATABASE_ERROR_RULES.find(({ pattern }) => pattern.test(error.message ?? ""));
  return rule ? new HttpError(rule.status, rule.message) : null;
}

export function notFoundHandler(req, res) {
  res.status(404).json({ message: `La ruta ${req.method} ${req.originalUrl} no existe` });
}

export function errorHandler(error, req, res, _next) {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ message: "El cuerpo de la peticion no es un JSON valido" });
  }

  const httpError = error instanceof HttpError ? error : resolveDatabaseError(error);
  if (httpError) {
    return res.status(httpError.status).json({ message: httpError.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Error interno del servidor" });
}
