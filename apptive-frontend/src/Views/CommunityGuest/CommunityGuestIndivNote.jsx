import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const CommunityGuestIndivNote = () => {
  const { person_id, note_id } = useParams();
  const [note, setNote] = useState({});
  useEffect(() => {
    // Check if note_id is defined before making the fetch request
    if (note_id) {
      fetch(`http://localhost:3000/${person_id}/community-notes/${note_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching note:", data.error);
            // Handle the error, e.g., show a message to the user
          } else {
            setNote(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching note:", error);
        });
    }
  }, [note_id]);

  return (
    <div className="community-indiv-note">
      <div style={{ margin: "0px 50px" }}>
        <Navbar />
        <div
          className="community-indiv-note-contents mt-2 text-white"
          style={{ margin: "0px 50px" }}
        >
          <Link to={`/${person_id}/community-notes`} className="text-white">
            {"<"}Back
          </Link>

          <h1 className="mb-2 mt-4">{note.note_title}</h1>
          <Link to={`../viewProfile/${note.user_name}`}>
            <small className="mb-1">@{note.user_name}</small>
          </Link>
          <p className="text-justify fs-5 mb-0 mt-2">{note.contents}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuestIndivNote;