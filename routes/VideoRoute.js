import express from "express";
import VideoController from "../controllers/VideoController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/slug", VideoController.getSlug);
router.get("/", VideoController.getVideo);
router.get("/:slug", VideoController.getVideoBySlug);

router.use(auth);

router.post("/", VideoController.addVideo);
router.put("/:id", VideoController.editVideo);
router.delete("/:id", VideoController.deleteVideo);

export default router;
