import express from "express";
import SupportController from "../controllers/SupportController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/", SupportController.getSupport);

router.use(auth);

router.post("/", SupportController.addSupport);
router.put("/:id", SupportController.editSupport);
router.delete("/:id", SupportController.deleteSupport);

export default router;
