import { fileURLToPath } from "node:url";
import { config } from "../config/env.js";
import { runDatabaseTask, runSurqlFile } from "../database/scriptRunner.js";

const SCHEMA_FILE = fileURLToPath(new URL("../../database/schema.surql", import.meta.url));

runDatabaseTask(
  async (db) => {
    const { namespace, database } = config.surreal;
    await db.query(`DEFINE NAMESPACE IF NOT EXISTS ${namespace}; USE NS ${namespace}; DEFINE DATABASE IF NOT EXISTS ${database};`);
    await db.use({ namespace, database });
    await runSurqlFile(db, SCHEMA_FILE);
    console.log(`Esquema aplicado en ${namespace}/${database}`);
  },
  { selectDatabase: false, errorMessage: "Error aplicando el esquema" },
);
