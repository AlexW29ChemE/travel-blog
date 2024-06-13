import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

const Comment = mongoose.models.Comment||mongoose.model('Comment', commentSchema);
export default Comment
