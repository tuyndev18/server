import express from "express";
import FeedBackController from "../controllers/FeedBackController.js";
import auth from "../middleware/Auth.js";
const router = express.Router();

router.get("/all", FeedBackController.getAll);

router.use(auth);

router.get("/", FeedBackController.getFeedBack);
router.post("/", FeedBackController.addFeedBack);
router.put("/:id", FeedBackController.editFeedBack);
router.delete("/:id", FeedBackController.deleteFeedBack);

export default router;
