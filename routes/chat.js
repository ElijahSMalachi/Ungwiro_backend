import express  from "express";
import { createChat, findChat, findUserChat } from "../controllers/chat.js";

const router = express.Router();

// create chat 

router.post('/', createChat);

// find user chats
router.get('/:userId', findUserChat);

// find chat

router.post('/find/:firstId/:secondId', findChat);

export default router;