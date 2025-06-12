import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import "./CodeOptimization.css";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const CodeOptimization: React.FC = () => {
  const { code, optimizedCode, setOptimizedCode } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

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

  // Fetch Optimized Code from API using code
  useEffect(() => {
    const fetchOptimizedCode = async () => {
      if (!code) {
        console.log("Skipping fetch: No source code provided");
        setErrors(["No source code provided"]);
        setOptimizedCode(null);
        return;
      }

      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const requestBody = { SourceCode: code };
        console.log("Sending request to ai-optimization API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/ai-optimization/optimize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch optimized code: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Parsed API data:", data);

        const optimized = data.optimizedCode as string;
        if (optimized == null || optimized === undefined) {
          console.warn("No optimized code returned in response");
          setErrors(["API returned no optimized code"]);
          setOptimizedCode(null);
        } else {
          setOptimizedCode(optimized);
          console.log("Optimized Code Fetched:", optimized);
        }
      } catch (error) {
        console.error("Error fetching optimized code:", error);
        setErrors([(error as Error).message || "Failed to fetch optimized code. Please try again."]);
        setOptimizedCode(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimizedCode();
  }, [code, setOptimizedCode]);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <h2 className="text-center text-white mb-3">Code Optimization</h2>
        <div className="row mb-2">
          {/* Code Optimization */}
          <div className="col-md-12 mb-2">
            <div
              className="p-3"
              style={{ backgroundColor: "#282828", overflowX: "auto", border: "1px solid #282828", borderRadius: "10px" }}
            >
              <h4 className="text-white text-center mb-2">Optimized Code</h4>
              <div
                className="p-3"
                style={{ backgroundColor: "#000000", border: "1px solid #282828", borderRadius: "10px" }}
              >
                {loading ? (
                  <p className="text-warning">Fetching optimized code...</p>
                ) : optimizedCode || optimizedCode === "" ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {optimizedCode || "No changes made (code is already optimized)"}
                  </pre>
                ) : (
                  <p className="text-warning">No optimized code available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Errors Section */}
        <Errors errors={errors} />

        {/* Notes Section */}
        <Notes notes={notes} />

        {/* Navigation Buttons */}
        <div className="row mx-0 mt-3">
          <div className="col text-center">
            <Link to="/source-code" className="btn py-2 mx-4 mb-2 px-5 prevButton">
              Go To Source Code Input
            </Link>
            <Link to="/" className="btn py-2 mx-4 mb-2 px-5 nextButton">
              Go To Main
            </Link>
          </div>
        </div>

        {/* Add Scroll Buttons */}
        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default CodeOptimization;