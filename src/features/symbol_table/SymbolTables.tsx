import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import "./SymbolTables.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import { useTheme } from "../context/ThemeContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

interface ParseTreeNode {
  type: string;
  value?: string;
  children?: ParseTreeNode[];
  [key: string]: any;
}

const SymbolTables: React.FC = () => {
  const { parseTree, tokens, code, setSymbolTables, symbolTables } = useCompilation();
  const { theme } = useTheme();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([
    "This is not a compilation phase, instead the symbol table is created and used by all phases, but we are showing it as a separate phase for more clarification",
    "Since we have scopes in our language, a symbol table is created for each scope",
    "Fields of a symbol table can contain more information like memory address, declaration line or data type, but for simplicity we only show the name and the type of the name",
  ]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateHeight = () => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(height);
      console.log("Updated Container Height:", height);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const fetchSymbolTables = async () => {
      console.log("ParseTree from context:", parseTree);
      if (!parseTree) {
        console.log("Skipping fetch: No parseTree");
        setErrors(["No parse tree available. Please complete syntax analysis first."]);
        return;
      }

      const storageKey = `symbolTables_${btoa(JSON.stringify(parseTree))}`;
      const storedSymbolTables = localStorage.getItem(storageKey);

      if (storedSymbolTables) {
        console.log("Found stored symbol tables in local storage:", storedSymbolTables);
        const parsedTables = JSON.parse(storedSymbolTables);
        if (Array.isArray(parsedTables) && parsedTables.length > 0) {
          setSymbolTables(parsedTables);
          setErrors([]);
          console.log("Using cached symbol tables from local storage");
          return;
        }
      }

      setLoading(true);
      setErrors([]);

      try {
        const requestBody = { ParseTree: parseTree };
        console.log("Sending request to symbol-tables API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/compilation/symbol-tables`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const responseText = await response.text();
        console.log("Raw API response:", responseText);

        if (!response.ok) {
          throw new Error(`Failed to fetch symbol tables: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log("Parsed API data:", data);

        const tables = data.symbolTables as { scope: string; names: { [key: string]: string } }[];
        if (!tables || tables.length === 0) {
          console.warn("No symbol tables returned in response");
          setErrors(["API returned no symbol tables"]);
          setSymbolTables(null);
        } else {
          setSymbolTables(tables);
          localStorage.setItem(storageKey, JSON.stringify(tables));
          console.log("Symbol Tables Fetched and Stored:", tables);
        }
        setErrors(data.errors || []);
      } catch (error) {
        console.error("Error fetching symbol tables:", error);
        setErrors([(error as Error).message || "Failed to fetch symbol tables. Please try again."]);
        setSymbolTables(null);
      } finally {
        setLoading(false);
        updateHeight();
      }
    };

    fetchSymbolTables();
  }, [parseTree, setSymbolTables]);

  useEffect(() => {
    updateHeight();
  }, [symbolTables]);

  const groupedTables = [];
  if (symbolTables) {
    for (let i = 0; i < symbolTables.length; i += 2) {
      groupedTables.push(symbolTables.slice(i, i + 2));
    }
  }

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className={`container-fluid main-background-color symbol-tables-container ${theme}`}
      >
        <h2 className="text-center mb-3">Symbol Tables</h2>

        {loading ? (
          <p className="text-center text-warning">Fetching symbol tables...</p>
        ) : symbolTables && symbolTables.length > 0 ? (
          groupedTables.map((tablePair, pairIndex) => (
            <div className="row" key={pairIndex}>
              {tablePair.map((table, index) => (
                <div className="col-md-6" key={index}>
                  <div className="table-container">
                    <h3>Scope: {table.scope}</h3>
                    <table className="table table-bordered symbol-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(table.names).length > 0 ? (
                          Object.entries(table.names).map(([name, type], idx) => (
                            <tr key={idx}>
                              <td>{name}</td>
                              <td>{type}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2} className="text-center">
                              No symbols in this scope
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-warning">No symbol tables available.</p>
        )}

        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link
              to="/syntax-analysis"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Syntax Analysis)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/syntax-analysis';
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              to="/semantic-analysis"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Semantic Analysis)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/semantic-analysis';
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="errors-section">
          <Errors errors={errors} />
        </div>

        <Notes notes={notes} />

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default SymbolTables;