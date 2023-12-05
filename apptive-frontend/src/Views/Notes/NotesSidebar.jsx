import React from "react";

const NotesSidebar = ({
  notes,
  // onAddNote,
  // onDeleteNote,
  // activeNote,
  // setActiveNote,
}) => {
  return (
    <div className="notes-sidebar">
      <div className="notes-sidebar-header">
        <div className="notes-sidebar-top">
          <h1>Notes</h1>
          <button>Add</button>
        </div>
        <div className="form-outline" data-mdb-input-init>
          <input
            type="search"
            id="form1"
            class="form-control"
            placeholder="Type query"
            aria-label="Search"
          />
        </div>{" "}
      </div>
      <div className="notes-sidebar-notes">
        {notes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`notes-sidebar-note ${note_id === activeNote && "active"}`}
            onClick={() => setActiveNote(note_id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button>Delete</button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="notes-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSidebar