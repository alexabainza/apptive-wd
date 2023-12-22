import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import CommunityNote from "./CommunityGuestNote";

const CommunityGuestDashboard = () => {
  const { person_id } = useParams();
  const [notes, setNotes] = useState([]);
  const [noNotesMessage, setNotesMessage] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate()
  const guestId = localStorage.getItem("guestId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!guestId) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/guest/community-notes`, {
            headers: {
                'Guest-Id': guestId,
            }
          }
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
  }, [person_id, guestId, navigate]);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const handleSort = (criteria) => {
    let sortedNotes = [...notes];
    let newSortOrder = "asc";

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
      case "Creator":
        sortedNotes.sort((a, b) =>
          newSortOrder === "asc"
            ? a.user_name.localeCompare(b.user_name)
            : b.user_name.localeCompare(a.user_name)
        );
        break;
      default:
        break;
    }

    setNotes(sortedNotes);
    setSortBy(criteria);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="guest-dashboard d-flex flex-column">
      <Navbar />

      <div className="guest-dashboard-contents">
        <h2 className="text-white "><strong>Community Notes</strong></h2>

        <div className="guest-dashboard-table-header-main pb-4  d-flex justify-content-between py-3">
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
                onClick={() => handleSort("Creator")}
              >
                Creator
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
            className="search-notes form-control w-25"
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Table bordered hover responsive variant="dark" className="my-0">
          <thead className="table-header text-center thead-dark ">
            <tr>
              <th>Title</th>
              <th>Folder</th>
              <th>Creator</th>
              <th>Date Modified</th>
            </tr>
          </thead>
          <tbody>
            {notes
              .filter((note) =>
                note.note_title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((note) => (
                <CommunityNote key={note.notes_id} note={note} />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CommunityGuestDashboard;