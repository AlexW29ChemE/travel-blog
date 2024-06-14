// pages/api/comments/index.js

import { NextResponse } from "next/server";
import db from "../../../../model/db";

export async function GET(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;
  const comments = await db.Comment.find({ blogId });
  return NextResponse.json(comments, { status: 200 });
}

export async function POST(request: Request) {
  const comment = await db.Comment.create(request.body);
  return NextResponse.json(comment, { status: 201 });
}
