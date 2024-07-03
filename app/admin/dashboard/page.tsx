import React from "react";
import db from "../../model/db";
import "./dashboard.modules.css";
import Link from "next/link";
import PublishButton from "../../components/PublishButton";


async function getBlogs() {
  return db.Blog.find().sort({ createdAt: -1 }); // Fetch blogs sorted by most recent
}

export default async function dashboard() {
  const entries = await getBlogs();

  return (
    <div>
      <h1>Travel Entries</h1>
      <div className="entriesList">
        {entries.map((entry) => (
          <div key={entry.id} className="entry">
            <h2>{entry.title}</h2>
            <p>
              <strong>Date:</strong> {entry.date.toLocaleDateString()}
            </p>
            <p>{entry.description}</p>
            <div className="actions">
              <Link href={`/admin/edit/${entry.id}`}>
                <button className="editButton">Edit</button>
              </Link>              
              <PublishButton id={entry.id} published={entry.published}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
