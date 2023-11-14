import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Reply from "../models/reply.js";
import ReplyToReply from "../models/ReplyToReply.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, videoPath, } = req.body;4
    const newPost = new Post({
      user: userId,
      description,
      picturePath,
      videoPath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    console.log(post);
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post= await Post
                       .find()
                       .populate('user')
                       .populate({
                        path: 'comments',
                        options: { sort: { createdAt: 'desc' } }, // Sort comments by createdAt in descending order
                        populate: [
                          {
                            path: 'reply',
                            options: { sort: { createdAt: 'asc' } }, // Sort replies by createdAt in ascending order
                            populate: [
                              { 
                                path: 'replyToReply', 
                                options: { sort: { createdAt: 'asc' } },
                                populate: {path: 'replyUser', model: 'User'}
                              },
                              { path: 'replyUser', model: 'User' }
                            ]
                          },
                          { path: 'commentUser', model: 'User' }
                        ]
                      })
                       .sort({createdAt: -1});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post
                      .find({ user: userId })
                      .populate('user')
                      .populate({
                        path: 'comments',
                        options: { sort: { createdAt: 'desc' } }, // Sort comments by createdAt in descending order
                        populate: [
                          {
                            path: 'reply',
                            options: { sort: { createdAt: 'asc' } }, // Sort replies by createdAt in ascending order
                            populate: [
                              { 
                                path: 'replyToReply', 
                                options: { sort: { createdAt: 'asc' } },
                                populate: {path: 'replyUser', model: 'User'}
                              },
                              { path: 'replyUser', model: 'User' }
                            ]
                          },
                          { path: 'commentUser', model: 'User' }
                        ]
                      })
                      .sort({createdAt: -1});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// DELETE

export const deletePost = async(req, res) =>{
  const { postId } = req.params;


  try {

    // Finally, delete the post itself
    await Comment.deleteMany({post: postId})
    await Reply.deleteMany({post: postId});
    await ReplyToReply.deleteMany({post: postId})
    const response = await Post.findByIdAndDelete(postId);

    res.json({ message: 'Post and associated data deleted successfully', response });
    
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error deleting post and associated data' });
  }

}