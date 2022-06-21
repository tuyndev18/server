import express from "express";
import BannerController from "../controllers/BannerController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.use(auth);

router.get("/", BannerController.getBanner);
router.post("/", BannerController.addBanner);
router.put("/:id", BannerController.editBanner);
router.delete("/:id", BannerController.deleteBanner);

export default router;
