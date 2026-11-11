import { Surreal } from "surrealdb";
import { config } from "../config/env.js";

const db = new Surreal();

export async function connectDatabase({ selectDatabase = true } = {}) {
  const { url, namespace, database, username, password } = config.surreal;

  await db.connect(url);
  await db.signin({ username, password });

  if (selectDatabase) {
    await db.use({ namespace, database });
  }

  return db;
}

export async function closeDatabase() {
  await db.close();
}

export function getDatabase() {
  return db;
}
