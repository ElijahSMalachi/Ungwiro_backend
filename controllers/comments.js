import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Create Comment


export const createComment = async (req,res)=>{

    try {
        const {commentText, commentPost, commentUser } = req.body;
        
        const comment = new Comment({
            commentText, 
            commentUser, 
            post: commentPost,
        })
        const savedComment = await comment.save();
        const {_id} = {...savedComment.toObject() };
        const post = await Post.findById(commentPost);
        post.comments.push(_id);
        await post.save();
        
        const updatedPost = await Post.findById(commentPost);
        const comments = await Comment.find();

        res.status(201).json({comments, updatedPost});
    } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }


