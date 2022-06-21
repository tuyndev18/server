import express from "express";
import ProductController from "../controllers/ProductController.js";
const router = express.Router();
import auth from "../middleware/Auth.js";

router.use(auth);

router.get("/", ProductController.getProducts);
router.post("/", ProductController.addProducts);
router.put("/:id", ProductController.editProducts);
router.delete("/:id", ProductController.deleteProducts);

router;

export default router;
