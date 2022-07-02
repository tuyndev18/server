import express from "express";
import ProductController from "../controllers/ProductController.js";
const router = express.Router();
import auth from "../middleware/Auth.js";

router.get("/slug", ProductController.getSlug);
router.get("/:slug", ProductController.getProductBySlug);
router.get("/", ProductController.getAll);

router.use(auth);

router.post("/", ProductController.addProducts);
router.put("/:id", ProductController.editProducts);
router.delete("/:id", ProductController.deleteProducts);

router;

export default router;
