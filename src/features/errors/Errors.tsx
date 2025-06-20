import React from "react";
import { useTheme } from "../../features/context/ThemeContext";
import "./Errors.css";

interface ErrorsProps {
  errors: string[];
}

const Errors: React.FC<ErrorsProps> = ({ errors }) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-div errors-container ${theme}`}>
      <h2 className="mb-3">Errors</h2>
      {errors.length > 0 ? (
        <ul className="list-group">
          {errors.map((error, index) => (
            <li key={index} className="list-group-item list-group-item-danger">
              {error}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-errors">No errors found</p>
      )}
    </div>
  );
};

export default Errors;