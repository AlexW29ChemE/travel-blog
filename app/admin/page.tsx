import React from "react";
import db from "../model/db";
import "./dashboard/dashboard.modules.css";
import Link from "next/link";
import axios from "axios";
import PublishButton from "../components/PublishButton";

async function getBlogs() {
  return db.Blog.find().sort({ date: -1 }); // Fetch blogs sorted by most recent
}

export default async function dashboard() {
  const entries = await getBlogs();
  // console.log(entries);

if (entries.length===0){
 return  <div>
    <h1>Travel Entries</h1>
    <p className="error-text">No Entries found</p>
  </div>
}

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
