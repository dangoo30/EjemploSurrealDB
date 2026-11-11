import { Router } from "express";
import { getSong, getSongs, postSong } from "../controllers/songController.js";

const router = Router();

router.get("/", getSongs);
router.post("/", postSong);
router.get("/:songId", getSong);

export default router;
