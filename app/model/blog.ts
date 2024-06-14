import mongoose, { InferSchemaType, Mongoose } from "mongoose";
import { locationSchema } from "./location";

const imageSchema = new mongoose.Schema(
  {
    name: String,
    mimeType: String,
    size: Number,
    lastModified: Number,
    key: String,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true, flattenObjectIds: true },
  }
);

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
    location: locationSchema,
    thumbnail: imageSchema,
    images: [imageSchema],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true, flattenObjectIds: true },
  }
);

export type BlogType = InferSchemaType<typeof blogSchema> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

function createModel() {
  if (mongoose.models.Blog) {
    return mongoose.models.Blog as never;
  }
  return mongoose.model("Blog", blogSchema);
}

const Blog = createModel();
export default Blog;
