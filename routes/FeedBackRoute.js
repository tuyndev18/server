import express from "express";
import FeedBackController from "../controllers/FeedBackController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/", FeedBackController.getFeedBack);

router.use(auth);

router.post("/", FeedBackController.addFeedBack);
router.put("/:id", FeedBackController.editFeedBack);
router.delete("/:id", FeedBackController.deleteFeedBack);

export default router;
