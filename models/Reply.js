import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to the Post model for the post to which the reply belongs.
  },
  replyText: {
    type: String,
    required: true,
  },
  replyUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the user who made the reply.
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', // Reference to the Comment model for the comment to which the reply belongs.
  },
  replyToReply: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReplyToReply' }],
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
