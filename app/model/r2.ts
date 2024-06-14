import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

// Upload to r2 directly from the browser, reduce server bandwidth
// Send all meta data back to the server to setup transfer and store copy in mongo, Server will provide a signed url to allow upload from client

///https://www.fullstackfoundations.com/blog/javascript-upload-file-to-s3#option-2-upload-to-aws-s3-directly-from-browser
