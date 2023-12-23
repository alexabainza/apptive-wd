import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserNavbar from "../Dashboard/UserNavbar";
import Note from "./Note";

const NotesPage = () => {
  const navigate = useNavigate();
  const { user_id, folder_name } = useParams();
  const storedToken = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [notesMessage, setNoNotesMessage] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!storedToken) {
      navigate("/login");
    } else {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [storedToken]);

  useEffect(() => {
    if (!storedToken) {
      navigate("/login");
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${folder_name}`, {
          headers: {
            Authorization: storedToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setNotes(data);
        } else {
          setNoNotesMessage("You have no notes.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error.message);
      }
    };

    fetchNotes();
  }, [storedToken, folder_name, navigate]);

  const handleSearch = (event) => {
    const newValue = event.target.value || "";
    setSearchQuery(newValue);
  };

  const handleSort = (criteria) => {
    let sortedNotes = [...notes];
    let newSortOrder = "asc";

    if (sortBy === criteria) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    switch (criteria) {
      case "Title":
        sortedNotes.sort((a, b) =>
          newSortOrder === "asc"
            ? a.note_title.localeCompare(b.note_title)
            : b.note_title.localeCompare(a.note_title)
        );
        break;
      case "Last Modified":
        sortedNotes.sort((a, b) =>
          newSortOrder === "asc"
            ? new Date(a.modified_at) - new Date(b.modified_at)
            : new Date(b.modified_at) - new Date(a.modified_at)
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
            Authorization: storedToken,
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
            Authorization: storedToken,
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

  const filteredNotes =
    notes && Array.isArray(notes)
      ? notes
          .filter((note) => note.note_title)
          .filter((note) =>
            note.note_title.toLowerCase().includes(searchQuery.toLowerCase())
          )
      : [];

  return (
    <>
      <div className="notes-main-page">
        <UserNavbar username={username} />
        <div className="notes-main-page-content">
          <div className="notes-main-page-header mb-2 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link
                to={`../dashboard`}
                className="notes-main-page-folder-text text-white"
              >
                <h2>Folders</h2>
              </Link>
              <h2 className="px-3" style={{ color: "#d74242", fontWeight: 800 }}>
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
                Sort By:{" "}
                {sortBy
                  ? `${sortBy} (${sortOrder === "asc" ? "Ascending" : "Descending"})`
                  : "Select"}
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
            {notes === null ? (
              <p className="text-white">Loading...</p>
            ) : filteredNotes.length === 0 ? (
              <p className="text-white">
                {notesMessage || "No notes found."}
              </p>
            ) : (
              filteredNotes.map((note) => (
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
