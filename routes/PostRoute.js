import express from 'express';
const router = express.Router();
import postCtrl from '../controllers/PostController.js';
import auth from '../middleware/Auth.js';
import decodeToken from '../middleware/DecodeToken.js';

//Token Decryption Middleware
// router.use(decodeToken);

// Middleware Check Permissions
// router.use(auth);

export default router;
