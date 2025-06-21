import React from "react";

interface ErrorsProps {
    errors: string[];
}

const Errors: React.FC<ErrorsProps> = ({ errors }) => {
  return (
    <div
      className="p-3 rounded-div mb-3"
      style={{
        backgroundColor: "#282828",
        overflowX: "auto"
      }}
    >
      <h2 className="mb-3 text-white">Errors</h2>
      {errors.length > 0 ? (
        <ul className="list-group">
          {errors.map((error, index) => (
            <li key={index} className="list-group-item list-group-item-danger">
              {error}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--main-color)" }}>No errors found</p>
      )}
    </div>
  );
};

export default Errors;
