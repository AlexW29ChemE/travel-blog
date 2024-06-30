import type { NextApiRequest, NextApiResponse } from "next";
import { PutBucketCorsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../../model/r2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import mime from "mime-types";
import { NextResponse } from "next/server";
import { isAuthorised, isDev } from "../../constants";
import { auth } from "../../../auth";

type FileMeta = { name: string; mimeType: string; size: number };
const TRAVEL_IMAGES_FOLDER = isDev()?"test-Images":"travel-images";
/**
 * 1. Client will send the mimetype in request body
 * 2. Server sends back a pre-signed PutObject S3 request
 * 3. Client will use the signed URL to make a PUT request to S3 with the file as the payload
 */
export const POST =auth( async(request)=> {
  // verify user is authorised
  if(!isAuthorised(request.auth?.user?.email)){
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const images: FileMeta[] = await request.json();
  const promises = images.map(async (file) => {
    //TODO consider generating a file hash on the client side using window.crypto.subtle.digest
    // Then search MongoDB for a matching hash to check for duplicate images

    const imagekey = `${TRAVEL_IMAGES_FOLDER}/${randomUUID()}.${mime.extension(
      file.mimeType
    )}`;
    const url = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: imagekey,
        ContentType: file.mimeType,
        ContentLength: file.size,
      }),
      { expiresIn: 2000 }
    );
    console.log(url);
    return { url, key: imagekey };
  });
  const urls = await Promise.all(promises);
  console.log(images, urls);
  return NextResponse.json(urls, { status: 200 });
})

