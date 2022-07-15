import express from "express";
import AboutController from "../controllers/AboutController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/:slug", AboutController.getAboutBySlug);

router.use(auth);

router.get("/", AboutController.getAbout);
router.post("/", AboutController.addAbout);
router.put("/:id", AboutController.editAbout);
router.delete("/:id", AboutController.deleteAbout);

export default router;
