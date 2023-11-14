import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  commentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the user who made the comment.
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to the Post model for the post to which the comment belongs.
  },
  reply: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
  }]
}, {timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
