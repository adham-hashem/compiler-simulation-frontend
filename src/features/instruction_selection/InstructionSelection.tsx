import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import "./InstructionSelection.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const InstructionSelection: React.FC = () => {
  const { optimizedIR, setAssemblyCode, assemblyCode } = useCompilation();
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
    const fetchAssemblyCode = async () => {
      console.log("OptimizedIR from context:", optimizedIR);
      console.log("Current assemblyCode:", assemblyCode);

      if (!optimizedIR) {
        console.log("Skipping fetch: No optimizedIR");
        return;
      }

      // Generate a unique key based on optimizedIR (e.g., hash or stringified content)
      const storageKey = `assemblyCode_${btoa(optimizedIR)}`; // Base64 encode optimizedIR for a unique key
      const storedAssembly = localStorage.getItem(storageKey);

      if (storedAssembly) {
        console.log("Found stored assembly code in local storage:", storedAssembly);
        const parsedAssembly = JSON.parse(storedAssembly);
        if (Array.isArray(parsedAssembly) && parsedAssembly.length > 0) {
          setAssemblyCode(parsedAssembly);
          setErrors([]);
          setNotes([]);
          console.log("Using cached assembly code from local storage");
          return; // Skip API fetch if valid data is found
        }
      }

      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const irArray = optimizedIR.split("\n").filter((line) => line.trim() !== "");
        console.log("Converted IR array:", irArray);
        const requestBody = { IR: irArray };
        console.log("Sending request to instruction-selection API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/compilation/instruction-selection`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const responseText = await response.text();
        console.log("Raw API response:", responseText);

        if (!response.ok) {
          throw new Error(`Failed to fetch assembly code: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log("Parsed API data:", data);

        const assembly = data.assembly as string[];
        if (!assembly || assembly.length === 0) {
          console.warn("No assembly code returned in response");
          setErrors(["API returned no assembly code"]);
          setAssemblyCode(null);
        } else {
          setAssemblyCode(assembly);
          localStorage.setItem(storageKey, JSON.stringify(assembly)); // Store in local storage
          console.log("Assembly Code Fetched and Stored:", assembly);
        }
        setErrors(data.errors || []);
      } catch (error) {
        console.error("Error fetching assembly code:", error);
        setErrors([(error as Error).message || "Failed to fetch assembly code. Please try again."]);
        setAssemblyCode(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAssemblyCode();
  }, [optimizedIR, setAssemblyCode]);

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
      <div ref={containerRef} className="container-fluid text-white main-background-color instr-container">
        <h2 className="mb-3 text-white text-center">Instruction Selection</h2>

        <div className="split-container">
          {/* Optimized IR Section */}
          <div className="ir-section" style={{ width: `calc(${irWidth}% - 5px)` }}>
            <div className="p-3 rounded-div ir-content">
              <h3 className="text-white">Optimized IR</h3>
              <div className="ir-wrapper">
                {optimizedIR ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {optimizedIR}
                  </pre>
                ) : (
                  <p className="text-warning">No optimized IR available</p>
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

          {/* Assembly Code Section */}
          <div className="asm-section" style={{ width: `calc(${100 - irWidth}% - 5px)` }}>
            <div className="p-3 rounded-div asm-content">
              <h3 className="text-white">Assembly Code</h3>
              <div className="asm-wrapper">
                {loading ? (
                  <p className="text-warning">Fetching assembly code...</p>
                ) : assemblyCode ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {assemblyCode.join("\n")}
                  </pre>
                ) : (
                  <p className="text-warning">No assembly code available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link
              to="/intermediate-code-optimization"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Intermediate Code Optimization)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/intermediate-code-optimization';
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
              to="/register-allocation"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Register Allocation)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/register-allocation';
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

export default InstructionSelection;