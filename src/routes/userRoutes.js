import { Router } from "express";
import { deleteFollowing, postFollowing } from "../controllers/followController.js";
import { deleteLike, getLikes, postLike } from "../controllers/likeController.js";
import { getRecommendations } from "../controllers/recommendationController.js";
import { getUser, getUsers, postUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.get("/:userId", getUser);

router.get("/:userId/likes", getLikes);
router.post("/:userId/likes", postLike);
router.delete("/:userId/likes/:songId", deleteLike);

router.post("/:userId/following", postFollowing);
router.delete("/:userId/following/:followedId", deleteFollowing);

router.get("/:userId/recommendations", getRecommendations);

export default router;
