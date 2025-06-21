import React from "react";

interface NotesProps {
    notes: string[];
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
  return (
    <div
      className="p-3 rounded-div"
      style={{
        backgroundColor: "#282828",
        overflowX: "auto"
      }}
    >
      <h2 className="mb-3 text-white">Notes</h2>
      {notes.length > 0 ? (
        <ul className="list-group">
          {notes.map((error, index) => (
            <li key={index} className="list-group-item list-group-item-success">
              {error}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--main-color)" }}>No notes found</p>
      )}
    </div>
  );
};

export default Notes;
