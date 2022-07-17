import express from "express";
import CatalogueController from "../controllers/CatalogueController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/", CatalogueController.getCatalogue);

router.use(auth);

router.post("/", CatalogueController.addCatalogue);
router.put("/:id", CatalogueController.editCatalogue);
router.delete("/:id", CatalogueController.deleteCatalogue);

export default router;
