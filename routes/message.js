import express  from "express";
import { createMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

// create chat 

router.post('/', createMessage);

// find user chats
router.get('/:chatId', getMessage);


export default router;