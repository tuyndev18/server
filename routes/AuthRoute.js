import express from "express";
import authController from "../controllers/AuthController.js";
const router = express.Router();

//Login Router
router.post("/login", authController.login);
router.post("/log_out", authController.logOut);
router.post("/change_password", authController.changePassword);
//connect

export default router;
