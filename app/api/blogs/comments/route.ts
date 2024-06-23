// pages/api/comments/index.js

import { NextResponse } from "next/server";
import db from "../../../model/db";
import { Comment } from "../../../model/types";

export async function GET(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;
  const comments = await db.Comment.find({ blogId });
  return NextResponse.json(comments, { status: 200 });
}

export async function POST(request: Request) {
  const commentData: Comment = await request.json();

  const comment = await db.Comment.create(commentData);
  return NextResponse.json(comment, { status: 201 });
}
