import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const CommunityGuestIndivNote = () => {
  const { person_id, note_id } = useParams();
  const [note, setNote] = useState({});
  const guestId = localStorage.getItem("guestId");
  const navigate = useNavigate()

  useEffect(() => {
    if (!guestId) {
      // Redirect to the login page
      navigate("/login");
      return;
    }
    // Check if note_id is defined before making the fetch request
    if (note_id) {
      fetch(`http://localhost:3000/guest/community-notes/${note_id}`,
      {
        headers: {
            'Guest-Id': localStorage.getItem("guestId"),
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching note:", data.error);
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
        <Navbar/>
        <div
          className="community-indiv-note-contents mt-2 text-white"
          style={{ margin: "0px 50px" }}
        >
          <Link to={`/guest/community-notes`} className="back-btn text-white">
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

export default CommunityGuestIndivNote;