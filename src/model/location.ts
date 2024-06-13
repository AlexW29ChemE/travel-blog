import mongoose from "mongoose";

export const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      type: {
        lat: {
          type: Number,
        },
        lng: {
          type: Number,
        },
      },
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
export default Location;

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

export const Visit =
  mongoose.models.Visit || mongoose.model("Visit", visitSchema);
