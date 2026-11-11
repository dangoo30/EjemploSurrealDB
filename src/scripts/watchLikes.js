import { Table } from "surrealdb";
import { closeDatabase, connectDatabase } from "../database/connection.js";

async function watchLikes() {
  const db = await connectDatabase();
  const subscription = await db.live(new Table("likes"));

  console.log("Escuchando likes en tiempo real (Ctrl + C para salir)...");

  process.on("SIGINT", async () => {
    await subscription.kill();
    await closeDatabase();
    process.exit(0);
  });

  for await (const { action, value } of subscription) {
    console.log(`[${action}] ${value.in} -> ${value.out}`);
  }
}

watchLikes().catch((error) => {
  console.error("Error en la consulta en vivo:", error.message);
  process.exit(1);
});
