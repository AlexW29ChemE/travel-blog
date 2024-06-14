import mongoose from "mongoose";

export const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: Number,
    longitude: Number,
    address: String,
    description: String,
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

// Visit Schema
const visitSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

function createModel() {
  if (mongoose.models.Visit) {
    return mongoose.models.Visit as never;
  }
  return mongoose.model("Visit", visitSchema);
}

export const Visit = createModel();
