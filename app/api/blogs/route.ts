import { NextResponse } from "next/server";
import db from "../../model/db";
import axios from "axios";
import { Blog } from "../../model/types";

export async function GET(request: Request) {
  const blogs = await db.Blog.find();
  return NextResponse.json(blogs, { status: 200 });
}

export async function POST(request: Request) {
  // verify user is authorised

  const data: Blog = await request.json();
  console.log(data);

  const blogs = await db.Blog.create(data);

  // Trigger revalidation

  // Return the Blog
  return NextResponse.json(blogs, { status: 201 });
}

export async function PUT(request: Request) {
  // verify user is authorised

  const data: Partial<Blog> = await request.json();
  console.log(data);
  const { id, ...updatedData } = data;
  const updatedBlog = await db.Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // Trigger revalidation

  // Return the Blog
  return NextResponse.json(updatedBlog, { status: 200 });
}
