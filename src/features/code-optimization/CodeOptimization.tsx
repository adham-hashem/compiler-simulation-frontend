import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../features/context/ThemeContext";
import "../../features/css/style.css";
import "./CodeOptimization.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const CodeOptimization: React.FC = () => {
  const { theme } = useTheme();
  const { code, optimizedCode, setOptimizedCode } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

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
    const fetchOptimizedCode = async () => {
      if (!code) {
        setErrors(["No source code provided"]);
        setOptimizedCode(null);
        return;
      }

      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const requestBody = { SourceCode: code };
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
        const optimized = data.optimizedCode as string;
        if (optimized == null || optimized === undefined) {
          setErrors(["API returned no optimized code"]);
          setOptimizedCode(null);
        } else {
          setOptimizedCode(optimized);
        }
      } catch (error) {
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
      <div ref={containerRef} className={`container-fluid code-opt-container ${theme}`}>
        <h2 className="text-center mb-3">Code Optimization</h2>
        <div className="row mb-2">
          <div className="col-md-12 mb-2">
            <div className="rounded-div opt-content">
              <h4 className="text-center mb-2">Optimized Code</h4>
              <div className="code-wrapper">
                {loading ? (
                  <p className="text-warning">Fetching optimized code...</p>
                ) : optimizedCode || optimizedCode === "" ? (
                  <pre>{optimizedCode || "No changes made (code is already optimized)"}</pre>
                ) : (
                  <p className="text-warning">No optimized code available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Errors errors={errors} />
        <Notes notes={notes} />

        <div className="row mx-0 mt-3">
          <div className="col text-center">
            <Link to="/source-code" className="btn prevButton mx-4 mb-2">Go To Source Code Input</Link>
            <Link to="/" className="btn nextButton mx-4 mb-2">Go To Main</Link>
          </div>
        </div>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default CodeOptimization;
