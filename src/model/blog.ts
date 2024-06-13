import mongoose, { InferSchemaType, Mongoose } from "mongoose";
import { locationSchema } from "./location";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // location: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Location",
    // },
    location: locationSchema,
    thumbnail: String,
    images: [
      {
        type: String,
      },
    ],
    markdownContent: {
      type: String,
    },
    privateContent: {
      type: String,
      select: false,
    },
    metadata: {
      type: Map,
      of: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export type BlogType = InferSchemaType<typeof blogSchema> & { id?: string };

function createModel() {
  if (mongoose.models.Blog) {
    return mongoose.models.Blog as never;
  }
  return mongoose.model("Blog", blogSchema);
}

const Blog = createModel();
export default Blog;

const f = {} as BlogType;
