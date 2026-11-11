import { fileURLToPath } from "node:url";
import { runDatabaseTask, runSurqlFile } from "../database/scriptRunner.js";

const SEED_FILE = fileURLToPath(new URL("../../database/seed.surql", import.meta.url));

runDatabaseTask(
  async (db) => {
    await runSurqlFile(db, SEED_FILE);
    console.log("Datos de prueba cargados");
  },
  { errorMessage: "Error cargando los datos de prueba" },
);
