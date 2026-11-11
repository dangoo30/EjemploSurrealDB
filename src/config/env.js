import "dotenv/config";

const REQUIRED_VARIABLES = [
  "SURREAL_URL",
  "SURREAL_NAMESPACE",
  "SURREAL_DATABASE",
  "SURREAL_USER",
  "SURREAL_PASS",
];

const IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9_]*$/;

function readConfig() {
  const missing = REQUIRED_VARIABLES.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missing.join(", ")}`);
  }

  const { SURREAL_NAMESPACE, SURREAL_DATABASE } = process.env;
  if (!IDENTIFIER_PATTERN.test(SURREAL_NAMESPACE) || !IDENTIFIER_PATTERN.test(SURREAL_DATABASE)) {
    throw new Error("SURREAL_NAMESPACE y SURREAL_DATABASE solo admiten letras, numeros y guion bajo");
  }

  return Object.freeze({
    port: Number(process.env.PORT) || 3000,
    recommendationLimit: Number(process.env.RECOMMENDATION_LIMIT) || 5,
    surreal: Object.freeze({
      url: process.env.SURREAL_URL,
      namespace: SURREAL_NAMESPACE,
      database: SURREAL_DATABASE,
      username: process.env.SURREAL_USER,
      password: process.env.SURREAL_PASS,
    }),
  });
}

export const config = readConfig();
