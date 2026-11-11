import { readFile } from "node:fs/promises";
import { closeDatabase, connectDatabase } from "./connection.js";

export async function runSurqlFile(db, filePath) {
  const script = await readFile(filePath, "utf8");
  return db.query(script);
}

export async function runDatabaseTask(task, { selectDatabase = true, errorMessage }) {
  try {
    const db = await connectDatabase({ selectDatabase });
    await task(db);
  } catch (error) {
    console.error(`${errorMessage}:`, error.message);
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}
