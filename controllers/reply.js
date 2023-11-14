import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Reply from "../models/reply.js";

// Create Reply


export const createReply = async (req,res)=>{

        
    try {
        const {replyText, replyComment, replyUser, postId } = req.body;
        
        const reply = new Reply({
            post: postId,
            replyText, 
            replyComment, 
            replyUser
        })
        const savedReply = await reply.save();
        const {_id} = {...savedReply.toObject() };
        const comment = await Comment.findById(replyComment);
        comment.reply.push(_id);
        await comment.save();
        const posts = await Post.find();



        res.status(201).json({posts});
    } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }


