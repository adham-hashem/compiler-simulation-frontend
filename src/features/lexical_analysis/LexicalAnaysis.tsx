import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCompilation } from "../context/CompilationContext";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Notes from "../../features/notes/Notes";
import Errors from "../errors/Errors";
import "../../features/css/style.css";
import "./LexicalAnalysis.css";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const LexicalAnalysis: React.FC = () => {
  const { code, setCode, tokens, setTokens } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [sourceWidth, setSourceWidth] = useState(60); // Initial width percentage
  const dragRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Measure container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Fetch tokens from API
  useEffect(() => {
    const fetchTokens = async () => {
      if (!code || tokens.length > 0) return;
      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const response = await fetch(`${API_BASE_URL}/api/compilation/lexical-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ SourceCode: code }),
        });

        if (!response.ok) throw new Error("Failed to fetch tokens");

        const data = await response.json();
        const fetchedTokens = data.tokens || [];
        setTokens(fetchedTokens);
        setErrors(data.errors || []);
        console.log("Tokens Fetched and Stored:", fetchedTokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setErrors([(error as Error).message || "Failed to fetch tokens. Please check your input."]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [code, tokens, setTokens]);

  // Drag handling
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Drag started");

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((moveEvent.clientX - containerRect.left) / containerRect.width) * 100;

      console.log("Dragging - New Width:", newWidth);

      if (newWidth >= 20 && newWidth <= 80) {
        setSourceWidth(newWidth);
      }
    };

    const stopDragging = () => {
      console.log("Drag ended");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);
  };

  console.log(`${API_BASE_URL}`);

  return (
    <>
      <Header />
      <div ref={containerRef} className="container-fluid text-white main-background-color lexical-container">
        <h2 className="mb-3 text-white text-center">Lexical Analysis</h2>

        <div className="split-container">
          {/* Source Code Section */}
          <div className="source-section" style={{ width: `${sourceWidth}%` }}>
            <div className="p-3 rounded-div source-content">
              <h2 className="mb-3 text-white">Source Code</h2>
              <textarea
                className="form-control p-3 text-white source-textarea"
                value={code}
                readOnly
              />
            </div>
          </div>

          {/* Drag Handle */}
          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `${sourceWidth}%` }}
          />

          {/* Tokens Section */}
          <div className="tokens-section" style={{ width: `${100 - sourceWidth}%` }}>
            <div className="p-3 rounded-div tokens-content">
              <h2 className="mb-3 text-white">Tokens</h2>
              {loading ? (
                <p className="text-warning">Analyzing...</p>
              ) : tokens.length > 0 ? (
                <div className="tokens-table-wrapper">
                  <table className="table table-bordered tokens-table">
                    <thead>
                      <tr style={{ background: "#616161", color: "white" }}>
                        <th style={{ borderTopLeftRadius: "10px" }}>Lexeme</th>
                        <th>Type</th>
                        <th>Line</th>
                        <th style={{ borderTopRightRadius: "10px" }}>Column</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokens.map((token, index) => (
                        <tr key={index}>
                          <td>{token.lexeme ?? "N/A"}</td>
                          <td>{token.type ?? "Unknown"}</td>
                          <td>{token.line ?? "-"}</td>
                          <td>{token.column ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-warning">No tokens found</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="row mx-0 mt-3">
          <div className="col text-center">
            <Link
              to="/source-code"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Source Code)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/source-code';
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              to="/syntax-analysis"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Syntax Analysis)"
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
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Errors Section */}
        <div className="mt-3 errors-div">
          <Errors errors={errors} />
        </div>

        {/* Notes Section */}
        <Notes notes={notes} />

        {/* Add Scroll Buttons */}
        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default LexicalAnalysis;