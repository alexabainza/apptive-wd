import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import CommunityNote from "./CommunityNote";
import { useParams } from "react-router-dom";

const GuestDashboard = () => {
  const { person_id } = useParams();
  const [notes, setNotes] = useState([]);
  const [noNotesMessage, setNotesMessage] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/${person_id}/community-notes`
        );
        const data = await response.json();
        if (data.success) {
          if (data.data.length === 0) {
            setNotesMessage("No notes.");
          } else {
            setNotes(data.data);
          }
        } else {
          console.error("Error fetching notes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, [person_id]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (criteria) => {
    let sortedNotes = [...notes];

    switch (criteria) {
      case "modifiedDate":
        sortedNotes.sort(
          (a, b) => new Date(b.modified_at) - new Date(a.modified_at)
        );
        break;
      case "alphabeticalOrder":
        sortedNotes.sort((a, b) => a.note_title.localeCompare(b.note_title));
        break;
      case "byUser":
        sortedNotes.sort((a, b) => a.user_name.localeCompare(b.user_name));
        break;
      default:
        break;
    }

    setNotes(sortedNotes);
    setSortBy(criteria);
  };

  return (
    <div className="guest-dashboard d-flex flex-column">
      <Navbar className="guestNavbar" />

      <div className="guest-dashboard-contents mx-5">
        <h3 className="text-white ">Community Notes</h3>

        <div className="guest-dashboard-table-header-main pb-4 mb-5 d-flex justify-content-between p-3">
          <div className="dropdown">
            <button
              className="btn btn-primary text-white dropdown-toggle ms-0"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By: {sortBy || "Select"}
            </button>
            <div className="dropdown-menu" aria-labelledby="sortDropdown">
              <button
                className="dropdown-item"
                onClick={() => handleSort("alphabeticalOrder")}
              >
                Title
              </button>
              {/* <button
                className="dropdown-item"
                onClick={() => handleSort("byUser")}
              >
                Folder
              </button> */}
              <button
                className="dropdown-item"
                onClick={() => handleSort("modifiedDate")}
              >
                Creator
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleSort("modifiedDate")}
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
        <div className="guest-dashboard-table-header d-flex">
          <small className="w-25 text-white text-center">Title</small>
          <small className="w-25 text-white text-center">Folder</small>
          <small className="w-25 text-white text-center">Creator</small>
          <small className="w-25 text-white text-center">Date modified</small>

        </div>
        <div className="guest-dashboard-notes-list">
          {notes
            .filter((note) =>
              note.note_title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((note) => (
              <div key={note.notes_id}>
                <CommunityNote note={note} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
