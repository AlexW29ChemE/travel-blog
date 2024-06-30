import { NextResponse } from "next/server";
import db from "../../model/db";
import axios from "axios";
import { Blog } from "../../model/types";
import { auth } from "../../../auth";
import { isAuthorised } from "../../constants";



export const  GET = auth(async (request)=> {

if(request.auth?.user?.email!==process.env.ADMIN_EMAIL){
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
}

  const blogs = await db.Blog.find();
  return NextResponse.json(blogs, { status: 200 });
})

export const POST = auth(async (request)=> {
  // verify user is authorised
  if(!isAuthorised(request.auth?.user?.email)){
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const data: Blog = await request.json();
  console.log(data);

  const blogs = await db.Blog.create(data);

  // Trigger revalidation

  // Return the Blog
  return NextResponse.json(blogs, { status: 201 });
})

export const PUT =  auth(async (request)=> {
  // verify user is authorised
  if(!isAuthorised(request.auth?.user?.email)){
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const data: Partial<Blog> = await request.json();
  console.log(data);
  const { id, ...updatedData } = data;
  const updatedBlog = await db.Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // Trigger revalidation

  // Return the Blog
  return NextResponse.json(updatedBlog, { status: 200 });
})
