import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import "./InstructionScheduling.css";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const InstructionScheduling: React.FC = () => {
  const { registersAssemblyCode, setScheduledAssemblyCode, scheduledAssemblyCode } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Measure container height on mount, resize, and content change
  const updateHeight = () => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(height);
      console.log("Updated Container Height:", height); // Debug height
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Fetch Scheduled Assembly Code from API using registersAssemblyCode
  useEffect(() => {
    const fetchScheduledAssemblyCode = async () => {
      console.log("RegistersAssemblyCode from context:", registersAssemblyCode);
      if (!registersAssemblyCode) {
        console.log("Skipping fetch: No registersAssemblyCode");
        setErrors(["No assembly code available. Please complete register allocation first."]);
        return;
      }

      // Generate a unique key based on registersAssemblyCode
      const storageKey = `scheduledAssemblyCode_${btoa(JSON.stringify(registersAssemblyCode))}`; // Base64 encode array for uniqueness
      const storedScheduledAssembly = localStorage.getItem(storageKey);

      if (storedScheduledAssembly) {
        console.log("Found stored scheduled assembly code in local storage:", storedScheduledAssembly);
        const parsedAssembly = JSON.parse(storedScheduledAssembly);
        if (Array.isArray(parsedAssembly) && parsedAssembly.length > 0) {
          setScheduledAssemblyCode(parsedAssembly);
          setErrors([]);
          setNotes([]);
          console.log("Using cached scheduled assembly code from local storage");
          return; // Skip API fetch if valid data is found
        }
      }

      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const requestBody = { assembly: registersAssemblyCode };
        console.log("Sending request to instruction-scheduling API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/compilation/instruction-scheduling`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const responseText = await response.text();
        console.log("Raw API response:", responseText);

        if (!response.ok) {
          throw new Error(`Failed to fetch scheduled assembly code: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log("Parsed API data:", data);

        const assembly = data.assembly as string[];
        if (!assembly || assembly.length === 0) {
          console.warn("No scheduled assembly code returned in response");
          setErrors(["API returned no scheduled assembly code"]);
          setScheduledAssemblyCode(null);
        } else {
          setScheduledAssemblyCode(assembly);
          localStorage.setItem(storageKey, JSON.stringify(assembly)); // Store in local storage
          console.log("Scheduled Assembly Code Fetched and Stored:", assembly);
        }
        setErrors(data.errors || []);
      } catch (error) {
        console.error("Error fetching scheduled assembly code:", error);
        setErrors([(error as Error).message || "Failed to fetch scheduled assembly code. Please try again."]);
        setScheduledAssemblyCode(null);
      } finally {
        setLoading(false);
        updateHeight(); // Re-calculate height after fetch completes
      }
    };

    fetchScheduledAssemblyCode();
  }, [registersAssemblyCode, setScheduledAssemblyCode]);

  // Re-calculate height when scheduledAssemblyCode changes
  useEffect(() => {
    updateHeight();
  }, [scheduledAssemblyCode]);

  // Function to download scheduledAssemblyCode as a text file
  const handleSaveOutput = () => {
    if (!scheduledAssemblyCode) {
      console.log("No scheduled assembly code to save");
      setErrors(["No scheduled assembly code available to save"]);
      return;
    }

    const content = scheduledAssemblyCode.join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "InstructionScheduling.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("Downloaded InstructionScheduling.txt");
  };

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <h2 className="text-center text-white mb-3">Instruction Scheduling</h2>
        <div className="row mb-2">
          {/* Scheduled Instructions Assembly Code */}
          <div className="col-md-12 mb-2">
            <div
              className="p-3"
              style={{ backgroundColor: "#282828", overflowX: "auto", border: "1px solid #282828", borderRadius: "10px" }}
            >
              <h4 className="text-white text-center mb-2">Scheduled Instructions Assembly Code - Final Output</h4>
              <div
                className="p-3"
                style={{
                  backgroundColor: "#000000",
                  border: "1px solid #282828",
                  borderRadius: "10px",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  overflowX: "auto" 
                }}
              >
                {loading ? (
                  <p className="text-warning">Fetching scheduled assembly code...</p>
                ) : scheduledAssemblyCode ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {scheduledAssemblyCode.join("\n")}
                  </pre>
                ) : (
                  <p className="text-warning">No scheduled assembly code available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation and Save Buttons */}
        <div className="row mx-0 mt-3">
          <div className="col text-center">
            <Link
              to="/register-allocation"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Register Allocation)"
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <button
              onClick={handleSaveOutput}
              className="btn arrow-button save-arrow mx-4 mb-2"
              role="button"
              aria-label="Save Scheduled Assembly Code Output"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSaveOutput();
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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Errors Section */}
        <Errors errors={errors} />

        {/* Notes Section */}
        <Notes notes={notes} />

        {/* Add Scroll Buttons */}
        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default InstructionScheduling;