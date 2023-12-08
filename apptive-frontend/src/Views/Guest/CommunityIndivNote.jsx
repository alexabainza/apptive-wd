import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const CommunityIndivNote = () => {
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
    <div className="community-indiv-note d-flex flex-column justify-content-center align-items-center">
      <Navbar/>
      <div className="notecont mt-5 text-white d-flex flex-column justify-content-center align-items-center">
        <h2 className="w-75 text-center mt-3"><strong>{note.note_title}</strong></h2>

        <p className="w-75 text-center fs-6 mb-0">@{note.user_name}</p>
        <p className="w-75 text-center fs-5 mt-5">{note.contents}</p>
      </div>
    </div>
   
  );
};

export default CommunityIndivNote;
