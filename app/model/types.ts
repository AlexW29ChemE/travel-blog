import type { BlogType } from "./blog";
import type { CommentType } from "./comment";

// export type Comment = {
//   _id: string;
//   username: string;
//   content: string;
//   time: string;
//   blogId: string;
// };

export type Comment = CommentType;

export type Location = {
  name: string;
  coordinates?: {
    latitude: Number;
    longitude: number;
  };
  address?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Blog = BlogType;

// export type Blog = {
//     title: string;
//     username: string;
//     description: string;
//     date: string; // Using string since the getter converts it to a string
//     location: Location;
//     images: string[];
//     markdownContent: string;
//     privateContent:string;
//     metadata: Map<string, string>;
//     userId: string;
//     comments: Comment[];
//     createdAt: Date;
//     updatedAt: Date;
// }
