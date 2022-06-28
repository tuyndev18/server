import express from "express";
import SupportController from "../controllers/SupportController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/all", SupportController.getAll);

router.use(auth);

router.get("/", SupportController.getSupport);
router.post("/", SupportController.addSupport);
router.put("/:id", SupportController.editSupport);
router.delete("/:id", SupportController.deleteSupport);

export default router;
