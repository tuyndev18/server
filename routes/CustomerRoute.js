import express from "express";
import CustomerController from "../controllers/CustomerController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.post("/", CustomerController.addCustomer);

router.use(auth);

router.get("/", CustomerController.getCustomer);
router.put("/:id", CustomerController.editCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

export default router;
