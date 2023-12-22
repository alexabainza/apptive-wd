import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Folders from "./Folders";
import UserNavbar from "./UserNavbar";
import AddButton from "./AddButton";

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [noFoldersMessage, setNoFoldersMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/dashboard`, {
        headers: {
          Authorization: storedToken,
        },
      });

      if (!response.ok) {
        console.error("Authentication failed: Invalid token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (data.success) {
        const [user] = data.user;
        setUsername(user.user_name);
        setUserId(user.user_id);
        setFolders(data.user);
        setNoFoldersMessage(
          data.user.length === 0 ? "You have no folders." : null
        );
      } else {
        console.error("Error fetching folders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const handleEditFolder = async (folderId, newFolderName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/dashboard/updateFolder/${folderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken,
          },
          body: JSON.stringify({ newFolderName }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.folder_id === folderId
              ? { ...folder, folder_name: newFolderName }
              : folder
          )
        );
      } else {
        console.error("Error updating folder", data.message);
      }
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  const handleFolderAdded = async (newFolderName, e) => {
    e.preventDefault();
    if (!newFolderName.trim()) {
      console.error("Folder name is empty or whitespace.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/dashboard/addFolder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken,
          },
          body: JSON.stringify({ folderName: newFolderName }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) => [
          ...prevFolders,
          {
            folder_id: data.folderId,
            folder_name: newFolderName,
            notesCount: 0,
          },
        ]);
      } else {
        console.error("Error adding folder:", data.message);
      }
    } catch (error) {
      console.error("Error adding folder:", error.message);
    }
  };

  const handleFolderDeleted = async (folderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/dashboard/deleteFolder/${folderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: storedToken,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setFolders((prevFolders) => {
          const newFolders = prevFolders.filter(
            (folder) => folder.folder_id !== folderId
          );
          if (newFolders.length === 0) {
            setNoFoldersMessage("You have no folders.");
          }
          return newFolders;
        });
      } else {
        console.error("Error deleting folder:", data.message);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  useEffect(() => {
    if (!storedToken) {
      console.error("Authentication failed: Token is missing");
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate, storedToken, folders]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (criteria) => {
    let newSortOrder = "asc";

    if (sortBy === criteria) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    setSortBy(criteria);
    setSortOrder(newSortOrder);
  };

  const sortAndFilterFolders = () => {
    let sortedFoldersList = [...folders];

    if (sortBy) {
      switch (sortBy) {
        case "Title":
          sortedFoldersList.sort((a, b) =>
            sortOrder === "asc"
              ? (a.folder_name || "").localeCompare(b.folder_name || "")
              : (b.folder_name || "").localeCompare(a.folder_name || "")
          );
          break;
        case "Created At":
          sortedFoldersList.sort((a, b) =>
            sortOrder === "asc"
              ? new Date(a.created_at || "") - new Date(b.created_at || "")
              : new Date(b.created_at || "") - new Date(a.created_at || "")
          );
          break;
        default:
          break;
      }
    }

    return sortedFoldersList.filter((folder) =>
      (folder.folder_name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const sortedAndFilteredFolders = sortAndFilterFolders();

  return (
    <div className="user-dashboard mt-0">
      <UserNavbar username={username} token={storedToken} />
      <div className="user-dashboard-bottom ">
        <h2 className="folderDirect text-white">
          <strong>Folders</strong>
        </h2>
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
              Sort By:{" "}
              {sortBy
                ? `${sortBy} (${
                    sortOrder === "asc" ? "Ascending" : "Descending"
                  })`
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
                onClick={() => handleSort("Created At")}
              >
                Created At
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
        {sortedAndFilteredFolders ? (
          sortedAndFilteredFolders.length > 0 ? (
            <Folders
              folders={sortedAndFilteredFolders}
              onDeleteFolder={handleFolderDeleted}
              onEditFolder={handleEditFolder}
            />
          ) : (
            <p className="text-white">
              {noFoldersMessage || "No matching folders found."}
            </p>
          )
        ) : (
          <p>Loading folders...</p>
        )}
      </div>
      <AddButton user_id={userId} onFolderAdded={handleFolderAdded} />
    </div>
  );
}

export default Dashboard;
