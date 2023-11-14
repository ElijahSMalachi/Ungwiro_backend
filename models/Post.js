import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the post's creator
    },
    picturePath: String,
    videoPath: String,
    description: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
