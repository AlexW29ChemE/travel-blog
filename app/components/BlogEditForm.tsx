"use client";

import { useState } from "react";
import axios from "axios";
import { Blog } from "../model/types";
import { useRouter } from "next/navigation";

type BlogFormProps = {
  blog?: Blog; // Make blog prop optional for initialization
};
const BlogForm: React.FC<BlogFormProps> = ({ blog }) => {
  const router = useRouter();
  const [title, setTitle] = useState(blog?.title || "");
  const [locationName, setLocationName] = useState(blog?.location?.name || "");
  const [latitude, setLatitude] = useState<number | undefined>(
    blog?.location?.latitude ?? 0
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    blog?.location?.longitude ?? 0
  );
  const [locationError, setLocationError] = useState("");
  const [date, setDate] = useState(
    blog?.date ? new Date(blog.date).toISOString().split("T")[0] : ""
  );
  const [content, setContent] = useState(blog?.markdownContent || "");
  const [journalEntry, setJournalEntry] = useState(blog?.privateContent || "");
  const [images, setImages] = useState<File[] | null>(null);
  const [thumbnail, setThumbnail] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Request Signed URLs for images
    type FileMeta = { name: string; mimeType: string; size: number };
    type ImageUrls = { key: string; url: string };
    const imageMeta: FileMeta[] =
      images?.map((image) => ({
        name: image.name,
        mimeType: image.type,
        size: image.size,
      })) ?? [];

    // request Presigned for cloud storage upload
    const { data } = await axios.post<ImageUrls[]>("/api/upload", imageMeta);
    console.log(data, imageMeta);

    // Use the pre-signed url to upload the file to R2 storage
    const uploadedImages: (
      | (FileMeta & { key: string; lastModified: number })
      | null
    )[] = [];
    let hasErrors = false;
    const promises = data.map(async ({ key, url }, i) => {
      if (images?.[i]) {
        try {
          console.log(images[i]);
          await axios.put(url, images[i], {
            headers: { "content-type": imageMeta[i].mimeType },
          });
          uploadedImages[i] = {
            ...imageMeta[i],
            key,
            lastModified: images[i].lastModified,
          };
        } catch (error) {
          uploadedImages[i] = null;
          console.error(error);
          hasErrors = true;
        }
      }
    });
    await Promise.all(promises);
    console.log(uploadedImages);

    if (hasErrors) {
      alert("Error uploading images");
      return;
    }

    // Prepare blog object
    const newBlog: Partial<Blog> = {
      ...blog,
      title,
      date: new Date(date),
      markdownContent: content,
      location: {
        name: locationName,
        latitude,
        longitude,
      },
      images: [
        ...uploadedImages.filter((image) => !!image),
        ...(blog?.images || []),
      ] as any,
      thumbnail: uploadedImages[thumbnail ?? 0],
      privateContent: journalEntry,
    };
    try {
      // Save entry to MongoDB
      const response = await axios({
        url: "/api/blogs",
        method: blog?.id ? "PUT" : "POST",
        data: newBlog,
      });
      console.log(blog?.id ? "Updated" : "Posted", " Blog", response.data);
      router.push("/admin");
    } catch (error) {
      console.error("Error posting blog:", error, newBlog);
    }
  };

  // get current location
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setLocationError(error.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  // Preview images before upload
  const imagePreviews = images?.map((image, index) => (
    <img
      key={index}
      src={URL.createObjectURL(image)}
      alt={`Image ${index + 1}`}
      //   width={100}
      //   height={100}
      className="image-preview"
      onClick={() => setThumbnail(index)}
    />
  ));

  // Preview thumbnail before upload
  const thumbnailPreview = thumbnail !== null && images && (
    <img
      src={URL.createObjectURL(images[thumbnail])}
      alt="Thumbnail Preview"
      width={100}
      height={100}
    />
  );

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>{blog?.id ? "Edit" : "Create"} Travel Entry</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="detailed-location">
        <div className="form-group">
          <label htmlFor="locationName">Location Name</label>
          <input
            type="text"
            id="locationName"
            required
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Location Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            id="latitude"
            value={latitude || ""}
            onChange={(e) => setLatitude(Number(e.target.value))}
            placeholder="Latitude"
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            id="longitude"
            value={longitude || ""}
            onChange={(e) => setLongitude(Number(e.target.value))}
            placeholder="Longitude"
          />
        </div>
        {locationError && <div className="location-error">{locationError}</div>}
        <button
          type="button"
          onClick={getCurrentLocation}
          style={{ width: "150px" }}
        >
          Get Current Location
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="images">Images</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={(e) =>
            setImages(e.target.files && Array.from(e.target.files))
          }
          accept="image/*"
        />
        <div className="image-previews">{imagePreviews}</div>
      </div>
      {blog?.images.length ? (
        <div>
          <p className="pseudo-label">Previously Uploaded</p>
          <div className="image-previews">
            {blog.images.map((image) => {
              return (
                <img
                  key={image.key}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BUCKET_HOST}/${image.key}`}
                  className="image-preview"
                />
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="form-group">
        <label htmlFor="thumbnail">Thumbnail</label>
        {thumbnailPreview}
      </div>
      <div className="form-group">
        <label htmlFor="journalEntry">Private Journal Entry</label>
        <textarea
          id="journalEntry"
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Journal content - Private"
        ></textarea>
      </div>
      <button type="submit">{blog?.id ? "Update" : "Submit"}</button>
    </form>
  );
};

export default BlogForm;
