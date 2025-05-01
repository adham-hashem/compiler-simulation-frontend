import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import "./MemoryVisualization.css"; // New CSS file
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

const MemoryVisualization: React.FC = () => {
  const { code, memoryExecutionSteps, setMemoryExecutionSteps } = useCompilation();
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [stackWidth, setStackWidth] = useState(50); // Default 50% width
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
    const fetchMemoryExecutionSteps = async () => {
      console.log("SourceCode from context:", code);
      if (!code) {
        console.log("Skipping fetch: No source code");
        return;
      }
      setLoading(true);
      setErrors([]);
      setCurrentStepIndex(0);

      try {
        const requestBody = { SourceCode: code };
        console.log("Sending request to memory-analysis API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/memory-analysis/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const responseText = await response.text();
        console.log("Raw API response:", responseText);

        if (!response.ok) {
          throw new Error(`Failed to fetch memory execution steps: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        console.log("Parsed API data:", data);

        const steps = data.executionSteps as { stepNumber: number; stepName: string; memoryState: { dataSegment: string[]; stack: { functionName: string; frameData: string[] }[] } }[];
        if (!steps || steps.length === 0) {
          console.warn("No execution steps returned in response");
          setErrors(["API returned no execution steps"]);
          setMemoryExecutionSteps(null);
        } else {
          setMemoryExecutionSteps(steps);
          console.log("Memory Execution Steps Fetched:", steps);
        }
        setErrors(data.errors || []);
      } catch (error) {
        console.error("Error fetching memory execution steps:", error);
        setErrors([(error as Error).message || "Failed to fetch memory execution steps. Please try again."]);
        setMemoryExecutionSteps(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMemoryExecutionSteps();
  }, [code, setMemoryExecutionSteps]);

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToNextStep = () => {
    if (memoryExecutionSteps && currentStepIndex < memoryExecutionSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const currentMemoryState = memoryExecutionSteps && memoryExecutionSteps.length > 0
    ? memoryExecutionSteps[currentStepIndex]
    : null;

  const stackDisplay = currentMemoryState?.memoryState.stack.length
    ? currentMemoryState.memoryState.stack
        .map(frame => `${frame.functionName}:\n  ${frame.frameData.join("\n  ")}`)
        .join("\n")
    : "Empty";

  const dataSegmentDisplay = currentMemoryState?.memoryState.dataSegment.length
    ? currentMemoryState.memoryState.dataSegment.join("\n")
    : "Empty";

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
        setStackWidth(newWidth);
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
      <div ref={containerRef} className="container-fluid text-white main-background-color mem-vis-container">
        <h1 className="text-center text-white mb-3">Memory Visualization</h1>

        {/* Step Navigation */}
        <div className="step-navigation mb-3 text-center">
          <button
            className="btn btn-outline-light mx-2"
            onClick={goToPreviousStep}
            disabled={!memoryExecutionSteps || currentStepIndex === 0}
          >
            Previous Step
          </button>
          <span className="mx-3">
            Step {currentMemoryState ? currentMemoryState.stepNumber : "-"}: {currentMemoryState?.stepName || "N/A"}
          </span>
          <button
            className="btn btn-outline-light mx-2"
            onClick={goToNextStep}
            disabled={!memoryExecutionSteps || currentStepIndex === memoryExecutionSteps.length - 1}
          >
            Next Step
          </button>
        </div>

        <div className="split-container">
          {/* Stack Section */}
          <div className="stack-section" style={{ width: `calc(${stackWidth}% - 5px)` }}>
            <div className="p-3 rounded-div stack-content">
              <h3 className="text-white">Stack</h3>
              <div className="stack-wrapper">
                {loading ? (
                  <p className="text-warning">Fetching memory data...</p>
                ) : currentMemoryState ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {stackDisplay}
                  </pre>
                ) : (
                  <p className="text-warning">No stack data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `calc(${stackWidth}% - 5px)` }}
          />

          {/* Heap (Data Segment) Section */}
          <div className="heap-section" style={{ width: `calc(${100 - stackWidth}% - 5px)` }}>
            <div className="p-3 rounded-div heap-content">
              <h3 className="text-white">Heap</h3>
              <div className="heap-wrapper">
                {loading ? (
                  <p className="text-warning">Fetching memory data...</p>
                ) : currentMemoryState ? (
                  <pre className="text-white" style={{ whiteSpace: "pre-wrap" }}>
                    {dataSegmentDisplay}
                  </pre>
                ) : (
                  <p className="text-warning">No heap data available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="errors-section">
          <Errors errors={errors} />
        </div>

        <Notes notes={notes} />

        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link to="/source-code" className="btn py-2 mx-4 mb-2 px-5 prevButton">
              Go To Source Code Input
            </Link>
            <Link to="/" className="btn py-2 mx-4 mb-2 px-5 nextButton">
              Go To Main
            </Link>
          </div>
        </div>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default MemoryVisualization;