import React from "react";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const Note = ({
  folder_name,
  user_id,
  folder_id,
  notes_id,
  title,
  last_modified,
  created_at,
  content,
  onDeleteNote,
}) => {
  const handleDeleteNote = () => {
    onDeleteNote(notes_id);
  };

  return (
    <div>
      <div className="note-list-item pb-0align-items-center justify-content-between text-white d-flex">
        <Link
          to={`/${user_id}/${folder_name}/${notes_id}`}
          className="note-item text-white d-flex align-items-center jusify-content-between"
        >
          <h5 className="note-title">{title}</h5>
        </Link>
        <div>
        <small className="note-date-modified my-3">
          {new Date(last_modified).toLocaleString()}

          </small>

          <button className="note-delete-icon" onClick={handleDeleteNote}>
            <Trash size={15}></Trash>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
