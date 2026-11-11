import { createApp } from "./app.js";
import { config } from "./config/env.js";
import { closeDatabase, connectDatabase } from "./database/connection.js";

async function start() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error("No fue posible conectar con SurrealDB:", error.message);
    process.exit(1);
  }

  const server = createApp().listen(config.port, () => {
    console.log(`API escuchando en http://localhost:${config.port}/api`);
  });

  const shutdown = async () => {
    server.close();
    await closeDatabase();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start();
