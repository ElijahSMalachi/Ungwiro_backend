import Message from "../models/Message.js";

// Create Message
export const createMessage = async(req,res)=>{
    const {senderId, text, chatId} = req.body;

    try {
        const message = new Message({
            chatId,
            senderId,
            text
        })
        const response = await message.save()
        
        res.status(201).json(response);

    } catch (e) {
        res.status(500).json(e)
    }
}

// Read Message

export const getMessage = async(req,res)=>{
    const { chatId } = req.params;

    try {
        const message = await Message.find({chatId})
        
        
        res.status(200).json(message);

    } catch (e) {
        res.status(500).json(e)
    }
}