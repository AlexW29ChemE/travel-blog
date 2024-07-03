import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { isAuthorised } from "../../../constants";
import db from "../../../model/db";
import { revalidatePath } from "next/cache";




export const PATCH = auth(async (request)=>{
  // verify user is authorised
  if(!isAuthorised(request.auth?.user?.email)){
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const data: {id:string,published:null|boolean|undefined}= await request.json();
  const { id } = data;
  console.log(data)
  const updatedBlog = await db.Blog.findByIdAndUpdate(id, {published:false}, {
    new: true,
  });

  // Trigger revalidation
  // Return the Blog
  return NextResponse.json(updatedBlog, { status: 200 });
})