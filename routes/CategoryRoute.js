import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/all", CategoryController.getAll);
router.use(auth);

router.get("/", CategoryController.getCategory);
router.get("/main", CategoryController.getMain);
router.get("/sub/:value", CategoryController.getSub);
router.get("/:id", CategoryController.getChild);
router.post("/", CategoryController.addCategory);
router.put("/:id", CategoryController.editCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
