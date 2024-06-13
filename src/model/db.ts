import Blog from "./blog";
import Comment from "./comment";
import Location, { Visit } from "./location";
import dbConnect from "./mongoose";

// export all db models from here

class Database {
  Blog: typeof Blog;
  Comment: typeof Comment;
  Location: typeof Location;
  Visit: typeof Visit;

  constructor() {
    this._connect();
    this.Blog = Blog;
    this.Comment = Comment;
    this.Location = Location;
    this.Visit = Visit;
  }

  private _connect() {
    dbConnect();
  }
}

const db = new Database();
export default db;
