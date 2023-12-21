import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserNavbar from "../Dashboard/UserNavbar";
import Note from "./Note";
import { Link, useNavigate } from "react-router-dom";
import { SortUpAlt, SortDownAlt } from "react-bootstrap-icons";

const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]); // Initialize with an empty array
  const [notesMessage, setNoNotesMessage] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(null);
  const { user_id, folder_name } = useParams();
  const [username, setUsername] = useState("");
  const storedToken = localStorage.getItem("token");
  const [sortOrder, setSortOrder] = useState("asc"); // Add sortOrder state

  useEffect(() => {
    setToken(storedToken);

    if (!storedToken) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/${folder_name}`, {
      headers: {
        Authorization: storedToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            setNoNotesMessage("You have no notes.");
          } else {
            setUsername(data[0].user_name);

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

 
  const handleSort = (criteria) => {
    let sortedNotes = [...notes];
    let newSortOrder = "asc";

    // If the same criteria is clicked again, toggle the sort order
    if (sortBy === criteria) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    switch (criteria) {
      case "Last Modified":
        sortedNotes.sort((a, b) =>
          newSortOrder === "asc"
            ? new Date(a.modified_at) - new Date(b.modified_at)
            : new Date(b.modified_at) - new Date(a.modified_at)
        );
        break;
      case "Title":
        sortedNotes.sort((a, b) =>
          newSortOrder === "asc"
            ? a.note_title.localeCompare(b.note_title)
            : b.note_title.localeCompare(a.note_title)
        );
        break;

      default:
        break;
    }

    setNotes(sortedNotes);
    setSortBy(criteria);
    setSortOrder(newSortOrder);
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${folder_name}/delete/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
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
            Authorization: token,
          },
          body: JSON.stringify(noteDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  return (
    <>
      <div className="notes-main-page">
        <UserNavbar username={username} token={token} />
        <div className="notes-main-page-content">
          <div className="notes-main-page-header mb-2 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link
                to={`../dashboard`}
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
              to={`/${folder_name}/addNote`}
              className="notes-main-page-add text-white"
              style={{ fontSize: "35px" }}
            >
              +
            </Link>
          </div>
          <div className="guest-dashboard-table-header-main pb-4 mb-2 d-flex justify-content-between p-3 px-0">
          <div className="dropdown">
            <button
              className="sort-by-button btn text-white dropdown-toggle ms-0"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By: {sortBy ? `${sortBy} (${sortOrder === "asc" ? "Ascending" : "Descending"})` : "Select"}
            </button>
            <div className="dropdown-menu" aria-labelledby="sortDropdown">
              <button
                className="dropdown-item"
                onClick={() => handleSort("Title")}
              >
                Title
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleSort("Last Modified")}
              >
                Last Modified
              </button>
            </div>
          </div>

            <input
              className="form-control w-25"
              type="text"
              placeholder="Search notes"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="notes-list">
            {notes.length === 0 ? (
              <p className="text-white">You have no notes.</p>
            ) : (
              notes
                .filter((note) =>
                  (note.note_title?.toLowerCase() || "").startsWith(
                    searchQuery.toLowerCase()
                  )
                )
                .map((note) => (
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
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesPage;
