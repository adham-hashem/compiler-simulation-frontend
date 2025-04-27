import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "./RegisterAllocation.css";
import { API_BASE_URL } from '../../config';

const RegisterAllocation: React.FC = () => {
  const { assemblyCode, setRegistersAssemblyCode, registersAssemblyCode } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [asmWidth, setAsmWidth] = useState(50); // Default 50% width
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
    const fetchRegistersAssemblyCode = async () => {
      console.log("AssemblyCode from context:", assemblyCode);
      if (!assemblyCode) {
        console.log("Skipping fetch: No assemblyCode");
        return;
      }

      // Generate a unique key based on assemblyCode
      const storageKey = `registersAssemblyCode_${btoa(JSON.stringify(assemblyCode))}`; // Base64 encode array for uniqueness
      const storedRegistersAssembly = localStorage.getItem(storageKey);

      if (storedRegistersAssembly) {
        console.log("Found stored registers assembly code in local storage:", storedRegistersAssembly);
        const parsedAssembly = JSON.parse(storedRegistersAssembly);
        if (Array.isArray(parsedAssembly) && parsedAssembly.length > 0) {
          setRegistersAssemblyCode(parsedAssembly);
          setErrors([]);
          setNotes([]);
          console.log("Using cached registers assembly code from local storage");
          return; // Skip API fetch if valid data is found
        }
      }

      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const requestBody = { assembly: assemblyCode };
        console.log("Sending request to register-allocation API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/compilation/register-allocation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const responseText = await response.text();
        console.log("Raw API response:", responseText);

        if (!response.ok) {
          throw new Error(`Failed to fetch registers assembly code: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log("Parsed API data:", data);

        const assembly = data.assembly as string[];
        if (!assembly || assembly.length === 0) {
          console.warn("No registers assembly code returned in response");
          setErrors(["API returned no registers assembly code"]);
          setRegistersAssemblyCode(null);
        } else {
          setRegistersAssemblyCode(assembly);
          localStorage.setItem(storageKey, JSON.stringify(assembly)); // Store in local storage
          console.log("Registers Assembly Code Fetched and Stored:", assembly);
        }
        setErrors(data.errors || []);
      } catch (error) {
        console.error("Error fetching registers assembly code:", error);
        setErrors([(error as Error).message || "Failed to fetch registers assembly code. Please try again."]);
        setRegistersAssemblyCode(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistersAssemblyCode();
  }, [assemblyCode, setRegistersAssemblyCode]);

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
        setAsmWidth(newWidth);
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
      <div ref={containerRef} className="container-fluid text-white main-background-color reg-alloc-container">
        <h2 className="mb-3 text-white text-center">Register Allocation</h2>

        <div className="split-container">
          {/* Assembly Code Section */}
          <div className="asm-section" style={{ width: `calc(${asmWidth}% - 5px)` }}>
            <div className="p-3 rounded-div asm-content">
              <h3 className="text-white">Assembly Code</h3>
              <div className="asm-wrapper">
                {assemblyCode ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {assemblyCode.join("\n")}
                  </pre>
                ) : (
                  <p className="text-warning">No assembly code available</p>
                )}
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `calc(${asmWidth}% - 5px)` }}
          />

          {/* Registers Assembly Code Section */}
          <div className="reg-asm-section" style={{ width: `calc(${100 - asmWidth}% - 5px)` }}>
            <div className="p-3 rounded-div reg-asm-content">
              <h3 className="text-white">Registers Assembly Code</h3>
              <div className="reg-asm-wrapper">
                {loading ? (
                  <p className="text-warning">Fetching registers assembly code...</p>
                ) : registersAssemblyCode ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {registersAssemblyCode.join("\n")}
                  </pre>
                ) : (
                  <p className="text-warning">No registers assembly code available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link
              to="/instruction-selection"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Instruction Selection)"
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              to="/instruction-scheduling"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Instruction Scheduling)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/instruction-scheduling';
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

export default RegisterAllocation;