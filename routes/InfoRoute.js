import express from "express";
import InfoController from "../controllers/InfoController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/", InfoController.getInfo);

router.use(auth);

router.put("/:id", InfoController.editInfo);

export default router;
