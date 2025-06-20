import React from "react";
import { useTheme } from "../../features/context/ThemeContext";
import "./Notes.css";

interface NotesProps {
  notes: string[];
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-div notes-container ${theme}`}>
      <h2 className="mb-3">Notes</h2>
      {notes.length > 0 ? (
        <ul className="list-group">
          {notes.map((note, index) => (
            <li key={index} className="list-group-item list-group-item-success">
              {note}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notes">No notes found</p>
      )}
    </div>
  );
};

export default Notes;