import Blog from "./blog";
import Comment from "./comment";
import { Visit } from "./location";
import dbConnect from "./mongoose";

// export all db models from here

class Database {
  Blog: typeof Blog;
  Comment: typeof Comment;
  Visit: typeof Visit;

  constructor() {
    this._connect();
    this.Blog = Blog;
    this.Comment = Comment;
    this.Visit = Visit;
  }

  private _connect() {
    dbConnect();
  }
}

const db = new Database();
export default db;
