import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createReply } from "../controllers/reply.js";

const router = express.Router();

router.post('/', verifyToken, createReply )
export default router;