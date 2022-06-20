import express from "express";
import authController from "../controllers/AuthController.js";
const router = express.Router();

router.get("/logout", (req, res) => {
  req.logout();
  res.json("logout thành công");
});

//Register Router
router.post("/register", authController.register);

//Login Router
router.post("/login", authController.login);
router.post("/refresh", authController.requestRefreshToken);
router.post("/log_out", authController.logOut);
//connect

export default router;
