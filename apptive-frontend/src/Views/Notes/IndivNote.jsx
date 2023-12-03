import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";

const IndivNote = () => {
  const { user_id, folder_name, note_id } = useParams();
  const [note, setNote] = useState({});
  const [editedNote, setEditedNote] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/${user_id}/${folder_name}/${note_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data != null) {
          setNote(data);
          setEditedNote(data); // Initialize editedNote with the current note data
        } else {
          console.error("Error fetching note:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [note_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${user_id}/${folder_name}/${note_id}/updateNote`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedNote),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      setNote(editedNote);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error.message);
    }
  };

  return (
    <div className="individual-note">
      <UserNavbar />
      {note.notes_id && (
        <>
          <h1 className="text-white">
            {isEditing ? (
              <input
                type="text"
                name="note_title"
                className="form-control"
                value={editedNote.note_title}
                onChange={handleInputChange}
              />
            ) : (
              note.note_title
            )}
          </h1>
          <p>Last Modified: {new Date(note.modified_at).toLocaleString()}</p>
          <textarea
            className="form-control"
            name="contents"
            value={isEditing ? editedNote.contents : note.contents}
            onChange={handleInputChange}
            rows="10"
            cols="50"
            readOnly={!isEditing}
          />
          {isEditing && (
            <button onClick={handleSaveChanges}>Save Changes</button>
          )}
          {!isEditing && (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </>
      )}
    </div>
  );
};

export default IndivNote;
