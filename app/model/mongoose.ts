import mongoose from "mongoose";
import { isProduction } from "../constants";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const mongoURL =
  isProduction()?process.env.MONGO_URI_PRODUCTION||'':process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel-blog";

if (!mongoURL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      // bufferCommands: false,
    };
    cached.promise = mongoose.connect(mongoURL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
