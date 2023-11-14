import Post from "../models/Post.js";
import ReplyToReply from "../models/ReplyToReply.js";
import Reply from "../models/reply.js";


// Create Reply-to-Reply


export const createReplyToReply = async (req,res)=>{

        
    try {
        const { postId, replyToReplyText, replyUser, replyId } = req.body;
        
        const replyToReply = new ReplyToReply({
            post: postId,
            replyToReplyText, 
            replyId, 
            replyUser
        })
        const savedReplyToReply = await replyToReply.save();
        const {_id} = {...savedReplyToReply.toObject() };
        const reply = await Reply.findById(replyId);
        reply.replyToReply.push(_id);
        await reply.save();
        const posts = await Post.find();



        res.status(201).json({posts});
    } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }


