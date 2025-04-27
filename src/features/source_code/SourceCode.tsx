import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import "../css/style.css";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "./SourceCode.css";
import { API_BASE_URL } from '../../config';

const SourceCode: React.FC = () => {
  const { code, updateCode } = useCompilation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [codeWidth, setCodeWidth] = useState(50); // Default 50% width
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileUpload = async (file: File) => {
    console.log("Uploading file:", file.name, "Size:", file.size);
    const formData = new FormData();
    formData.append("SourceCodeImage", file);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ocr/extract-code`, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw API response:", responseText);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to extract code from image: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed API data:", data);

      const extractedCode = data.extractedCode || "";
      if (!extractedCode) {
        console.warn("No code extracted from image");
        setError("No code was extracted from the image.");
      } else {
        updateCode(extractedCode);
        console.log("Extracted Code:", extractedCode);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(`Failed to process image: ${(error as Error).message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    handleFileUpload(event.target.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

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
        setCodeWidth(newWidth);
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
      <div ref={containerRef} className="container-fluid text-white main-background-color source-code-container">
        <h2 className="mb-3 text-white text-center">Source Code Input</h2>

        <div className="split-container">
          {/* Source Code Section */}
          <div className="code-section" style={{ width: `calc(${codeWidth}% - 5px)` }}>
            <div className="p-3 rounded-div code-content">
              <h3 className="text-white">Source Code</h3>
              <textarea
                className={`form-control code-wrapper text-white ${isDragging ? "dragging" : ""}`}
                rows={17}
                value={code}
                onChange={(e) => updateCode(e.target.value)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                placeholder="Enter your source code here or drag and drop an image..."
              />
              <div className="upload-section text-center mt-3">
                <label className="upload-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <input type="file" accept="image/*" className="d-none" onChange={handleButtonUpload} />
                </label>
                {loading && <span className="ms-2" style={{ color: "green" }}>Processing...</span>}
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `calc(${codeWidth}% - 5px)` }}
          />

          {/* Grammar Section */}
          <div className="grammar-section" style={{ width: `calc(${100 - codeWidth}% - 5px)` }}>
            <div className="p-3 rounded-div grammar-content">
              <h3 className="text-white">Grammar</h3>
              <div className="grammar-wrapper">
                <pre className="text-white">
                  {`<program> ::= <variableDeclaration>* <functionDefinition>* <mainFunction> EOF

                    <functionDefinition> ::= "int" <IDENTIFIER> "(" "int" <IDENTIFIER> "," "int" <IDENTIFIER> ")" "{" <statement>* <returnStatement> "}"

                    <mainFunction> ::= "int" "main" "(" ")" "{" <statement>* <returnStatement> "}"

                    <returnStatement> ::= "return" <expression> ";"

                    <statement> ::= <variableDeclaration> 
                                  | <assignment> 
                                  | <whileLoop> 
                                  | <ifStatement>

                    <variableDeclaration> ::= "int" <IDENTIFIER> "=" <expression> ";"

                    <assignment> ::= <IDENTIFIER> "=" <expression> ";"

                    <whileLoop> ::= "while" "(" <condition> ")" "{" <statement>* "}"

                    <ifStatement> ::= "if" "(" <condition> ")" "{" <statement>* "}" <elseStatement>?

                    <elseStatement> ::= "else" "{" <statement>* "}"

                    <expression> ::= <operand>
                                  | <operand> <operator> <operand>
                                  | <functionCall>

                    <functionCall> ::= <IDENTIFIER> "(" <expression> "," <expression> ")"

                    <operand> ::= <IDENTIFIER> | <INT>

                    <operator> ::= "+" | "-" | "*" | "/" | "%"

                    <condition> ::= <operand> <comparisonOperator> <operand>

                    <comparisonOperator> ::= ">" | "<" | ">=" | "<=" | "==" | "!="

                    (* Terminals *)
                    <IDENTIFIER> ::= [a-zA-Z_][a-zA-Z0-9_]* 
                    <INT> ::= "0" | [1-9][0-9]*
                    `}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-0 mt-3">
          <div className="col text-center">
            <Link to="/code-optimization" className="btn btn-outline-light py-2 mx-4 mb-2 px-5 btn1">
              Optimize Code
            </Link>
            <Link to="/lexical-analysis" className="btn nextButton py-2 mx-4 mb-2 px-5 btn2">
              Simulate Code
            </Link>
            <Link to="/memory-visualization" className="btn btn-outline-light py-2 mx-4 mb-2 px-5 btn3">
              Simulate Memory
            </Link>
          </div>
        </div>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default SourceCode;