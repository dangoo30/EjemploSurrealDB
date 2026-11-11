import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import songRoutes from "./routes/songRoutes.js";
import userRoutes from "./routes/userRoutes.js";

export function createApp() {
  const app = express();

  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ message: "Servicio activo" });
  });
  app.use("/api/users", userRoutes);
  app.use("/api/songs", songRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
