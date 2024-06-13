"use client";

import { ReactEventHandler, useState } from "react";
import axios from "axios";
import { Blog, Location } from "../../model/types";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit: ReactEventHandler = async (e) => {
    e.preventDefault();
    // // Upload images to Cloudflare R2 and get URLs
    // const imageUrls = await Promise.all(images.map(async (image) => {
    //   const formData = new FormData();
    //   formData.append('file', image);
    //   const { data } = await axios.post('/api/blogs', formData);
    //   return data.url;
    // }));

    const blog: Partial<Blog> = {
      title,
      date,
      markdownContent: content,
      location: { name: location } as Location,
      privateContent: journalEntry,
    };
    // Save entry to MongoDB
    await axios.post("/api/blogs", blog);
    console.log("Posted Blog", blog);

    // Trigger revalidation or update
    // await axios.post('/api/revalidate');
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>Create a New Travel Entry</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Date</label>
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
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="images">Images</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files ?? []))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Private Journal Entry</label>
        <textarea
          id="journal"
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Journal content - Private"
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
