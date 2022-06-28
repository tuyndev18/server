import express from "express";
import PaletteController from "../controllers/PaletteController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();


router.use(auth);

router.get("/color/:value", PaletteController.getColor);
router.get("/:id", PaletteController.findByCategory);
router.post("/", PaletteController.addColor);
router.put("/:id", PaletteController.editColor);
router.delete("/:id", PaletteController.deleteColor);

export default router;
