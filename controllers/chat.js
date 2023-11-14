import Chat from "../models/Chat.js";
// create Chat
export const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    console.log({ firstId, secondId });
    
    try {
        // Attempt to find an existing chat
        const existingChat = await Chat.findOne({
            members: { $all: [firstId, secondId] }
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        } else {
            // If no chat exists, create a new one
            const newChat = new Chat({
                members: [firstId, secondId]
            });

            const response = await newChat.save();
            return res.status(201).json(response);
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
}



// Get User Chats
export const findUserChat = async(req,res)=>{
    const {firstId, secondId} = req.body;
    try {
        const chat = Chat.findOne({
            members: { $all: [firstId, secondId]}
        })


        res.status(201).json(chat)

    } catch (e) {
        res.status(500).json(e)
    }
}



// Find Chat

export const findChat = async(req,res)=>{
    const {userId} = req.params.userId;
    try {
        const chats = await Chat.find({
            members: { $in: [userId]}
        })

        if(!chats) return res.status(404).json({error: 'chat not found'});

        res.status(200).json(chats)

    } catch (e) {
        res.status(500).json(e)
    } 
}

