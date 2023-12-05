import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import Note from "./Note";
import { Link, useNavigate } from "react-router-dom";
import { SortUpAlt, SortDownAlt } from "react-bootstrap-icons";

const NotesPage = () => {
  // const [sort, set]
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};
  const [notes, setNotes] = useState([]); // Initialize with an empty array
  const [notesMessage, setNoNotesMessage] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const { user_id, folder_name } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/${user_id}/${folder_name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);

        if (Array.isArray(data)) {
          if (data.length === 0) {
            setNoNotesMessage("You have no notes.");
          } else {
            console.log(data);
            setNotes(data);
          }
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user_id, folder_name]);

  const handleSort = () => {
    const sortedNotes = [...notes].sort((a, b) => {
      const dateA = new Date(a.modified_at).getTime();
      const dateB = new Date(b.modified_at).getTime();

      return isAscending ? dateA - dateB : dateB - dateA;
    });

    setNotes(sortedNotes);
    setIsAscending(!isAscending);
  };

  const deleteNote = async (noteId) => {
    try {
      console.log("Delete button has been clicked");
      const response = await fetch(
        `http://localhost:3000/${user_id}/${folder_name}/delete/${noteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.notes_id !== noteId)
      );
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const addNote = async (noteDetails) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${user_id}/${folder_name}/addNote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      const data = await response.json();
      console.log("Note saved successfully:", data);
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  return (
    <>
      <div className="notes-main-page">
        <UserNavbar user_id={user_id} />
        <div className="notes-main-page-content">
          <div className="notes-main-page-header mb-5 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link
                to={`../${user_id}/dashboard`}
                className="notes-main-page-folder-text text-white"
              >
                <h2>Folders</h2>
              </Link>
              <h2
                className="px-3"
                style={{ color: "#d74242", fontWeight: 800 }}
              >
                {">"}
              </h2>
              <h2 className="text-white">{folder_name}</h2>
            </div>

            <Link
              to={`/${user_id}/${folder_name}/addNote`}
              className="notes-main-page-add text-white"
              style={{ fontSize: "35px" }}
            >
              +
            </Link>
          </div>
          <div className="notes-page-header d-flex text-white justify-content-between">
            <small className="align-items-center">Title</small>
            <div className="notes-page-header-right">
              <small className="text-white me-3">Sort by</small>
              {isAscending ? (
                <SortUpAlt size={20} className="mb-0s" onClick={handleSort} />
              ) : (
                <SortDownAlt size={20} className="mb-0s" onClick={handleSort} />
              )}{" "}
            </div>
          </div>
          <div className="notes-list">
            {notes.map((note) => (
              <div key={note.notes_id}>
                <Note
                  folder_name={note.folder_name}
                  user_id={note.user_id}
                  folder_id={note.folder_id}
                  notes_id={note.notes_id}
                  title={note.note_title}
                  last_modified={note.modified_at}
                  created_at={note.created_at}
                  content={note.contents}
                  onDeleteNote={deleteNote}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesPage;
