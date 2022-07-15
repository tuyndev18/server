import express from "express";
import DiscountController from "../controllers/DiscountController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/", DiscountController.getDiscount);

router.use(auth);

router.post("/", DiscountController.addDiscount);
router.put("/:id", DiscountController.editDiscount);
router.delete("/:id", DiscountController.deleteDiscount);

export default router;
