import mongoose from "mongoose";

const replyToReplySchema = new mongoose.Schema({
    replyUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply', // Reference to the Post model for the post to which the comment belongs.
      },
    replyToReplyText: {
        type: String,
        required: true,
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the Post model for the post to which the comment belongs.
      },
  }, {timestamps: true });
  
const ReplyToReply = mongoose.model('ReplyToReply', replyToReplySchema);
export default ReplyToReply;


