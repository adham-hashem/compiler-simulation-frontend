import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import "./IntermediateCodeOptimization.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const IntermediateCodeOptimization: React.FC = () => {
  const { code, tokens, intermediateCode, setIntermediateCode, optimizedIR, setOptimizedIR } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [irWidth, setIrWidth] = useState(50); // Default 50% width
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    const fetchOptimizedIR = async () => {
      if (!intermediateCode || optimizedIR) return;
      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const requestBody = { ir: intermediateCode };
        console.log("Sending request to ir-optimization API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/compilation/ir-optimization`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch optimized IR: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const optimized = data.optimizedIR as string;
        setOptimizedIR(optimized);
        setErrors(data.errors || []);
        console.log("Optimized IR Fetched:", optimized);
      } catch (error) {
        console.error("Error fetching optimized IR:", error);
        setErrors([(error as Error).message || "Failed to fetch optimized IR. Please try again."]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimizedIR();
  }, [intermediateCode, optimizedIR, setOptimizedIR]);

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Drag started");

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const splitterWidthPercentage = (10 / containerRect.width) * 100;
      const newWidth = ((moveEvent.clientX - containerRect.left) / containerRect.width) * 100 - (splitterWidthPercentage / 2);
      console.log("Dragging - New Width:", newWidth);
      if (newWidth >= 20 && newWidth <= 80) {
        setIrWidth(newWidth);
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

  return (
    <>
      <Header />
      <div ref={containerRef} className="container-fluid text-white main-background-color ir-opt-container">
        <h2 className="mb-3 text-white text-center">Intermediate Code Optimization</h2>

        <div className="split-container">
          {/* Intermediate Code Section */}
          <div className="ir-section" style={{ width: `calc(${irWidth}% - 5px)` }}>
            <div className="p-3 rounded-div ir-content">
              <h3 className="text-white">Intermediate Code</h3>
              <div className="ir-wrapper">
                {intermediateCode ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {intermediateCode}
                  </pre>
                ) : (
                  <p className="text-warning">No intermediate code available</p>
                )}
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `calc(${irWidth}% - 5px)` }}
          />

          {/* Optimized IR Section */}
          <div className="opt-ir-section" style={{ width: `calc(${100 - irWidth}% - 5px)` }}>
            <div className="p-3 rounded-div opt-ir-content">
              <h3 className="text-white">Optimized IR</h3>
              <div className="opt-ir-wrapper">
                {loading ? (
                  <p className="text-warning">Fetching optimized IR...</p>
                ) : optimizedIR ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {optimizedIR}
                  </pre>
                ) : (
                  <p className="text-warning">No optimized IR available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link
              to="/intermediate-code-generation"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Intermediate Code Generation)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/intermediate-code-generation';
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
              to="/instruction-selection"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Instruction Selection)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/instruction-selection';
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

        {/* <div className="errors-section">
          <Errors errors={errors} />
        </div> */}

        <Notes notes={notes} />

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default IntermediateCodeOptimization;