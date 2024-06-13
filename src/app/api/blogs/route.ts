import { NextResponse } from "next/server";
import db from "../../../model/db";
import axios from "axios";

export async function GET(request: Request) {
  const blogs = await db.Blog.find();
  return NextResponse.json(blogs, { status: 200 });
}

export async function POST(request: Request) {
  // verify user is authorised

  // extract and validate file
  // const formData = await request.formData();
  // const file: any = formData.get('file')

  //   // Handle file upload to Cloudflare R2 storage
  //  const uploadRes = await axios.post('CLOUDFLARE_R2_UPLOAD_URL', file, {
  //    headers: {
  //      'Content-Type': 'multipart/form-data',
  //    },
  //  });
  // create blog in Mongo
  const data = await request.json();
  console.log(data);

  const blogs = await db.Blog.create(data);

  // Trigger revalidation

  // Return the Blog
  return NextResponse.json(blogs, { status: 200 });
}
