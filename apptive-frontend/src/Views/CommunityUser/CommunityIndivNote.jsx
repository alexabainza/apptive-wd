import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
const CommunityIndivNote = () => {
  const { person_id, note_id } = useParams();
  const [note, setNote] = useState({});
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    // Check if note_id is defined before making the fetch request
    if (note_id) {
      fetch(`http://localhost:3000/community-notes/${note_id}`,{
        headers: {
          Authorization: storedToken,
        },
      })
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
        <UserNavbar/>
        <div
          className="community-indiv-note-contents mt-2 text-white"
          style={{ margin: "0px 50px" }}
        >
          <Link to={`/community-notes`} className="back-btn text-white">
            {"<"}  Back
          </Link>

          <h1 className="mb-2 mt-4">{note.note_title}</h1>
          <Link to={`../viewProfile/${note.user_name}`}>
            <small className="mb-1">@{note.user_name}</small>
          </Link>
          <p className="community-indiv-note-notecontents text-justify mb-0 mt-2">{note.contents}</p>
        </div>
    </div>
  );
};

export default CommunityIndivNote;
