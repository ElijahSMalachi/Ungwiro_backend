import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createReplyToReply } from "../controllers/replyToReply.js";

const router = express.Router();

router.post('/', verifyToken, createReplyToReply )
export default router;