import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserNavbar from "../Dashboard/UserNavbar";

const CommunityIndivNote = () => {
  const { note_id } = useParams();
  const [note, setNote] = useState({});
  const [username, setUsername] = useState("");

  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [storedToken]);
  useEffect(() => {
    if (note_id) {
      fetch(`http://localhost:3000/community-notes/${note_id}`, {
        headers: {
          Authorization: storedToken,
        },
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
      <UserNavbar username={username} />
      <div
        className="community-indiv-note-contents mt-2 text-white"
        style={{ margin: "0px 50px" }}
      >
        <Link to={`/community-notes`} className="back-btn text-white">
          {"<"} Back
        </Link>

        <h1 className="mb-2 mt-4">{note.note_title}</h1>
        <Link to={`../viewProfile/${note.user_name}`}>
          <small className="mb-1">@{note.user_name}</small>
        </Link>
        <p className="community-indiv-note-notecontents text-justify mb-0 mt-2">
          {note.contents}
        </p>
      </div>
    </div>
  );
};

export default CommunityIndivNote;
