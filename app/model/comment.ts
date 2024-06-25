import mongoose, { InferSchemaType } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    username: {
      type: String,
      required: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export type CommentType = InferSchemaType<typeof commentSchema> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

function createModel() {
  if (mongoose.models.Comment) {
    return mongoose.models.Comment as never;
  }
  return mongoose.model("Comment", commentSchema);
}

const Comment = createModel();
export default Comment;
