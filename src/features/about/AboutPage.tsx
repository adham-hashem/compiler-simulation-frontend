import React, { useEffect, useRef, useState } from "react";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons"; // Adjust path as needed
import "../../features/css/style.css"; // Ensure this includes main-background-color

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Measure container height on mount and resize
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

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color px-5 py-4"
        style={{ minHeight: "100vh" }}
      >
        <section className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            - Project Title
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>Compiler Simulation with AI Optimization and Memory Visualization</strong>
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            - Project Overview
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            HAMSY Compiler aims to revolutionize the way C++ code is optimized and analyzed by utilizing neural networks to improve
            performance and reduce unnecessary computations. Unlike traditional compilers, which focus solely on translating code
            into machine language, HAMSY introduces AI-driven optimizations while offering detailed insights into compilation stages:
          </p>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li>
              <strong>Lexical Analysis:</strong> Tokenizing the source code and generating a symbol table.
            </li>
            <li>
              <strong>Syntax Analysis:</strong> Constructing a parse tree and validating syntax structure.
            </li>
            <li>
              <strong>Semantic Analysis:</strong> Generating an Abstract Syntax Tree (AST) and performing type checking.
            </li>
            <li>
              <strong>Intermediate Representation (IR) Generation:</strong> Transforming the AST into an intermediate form for further optimization.
            </li>
            <li>
              <strong>Optimization:</strong> Enhancing the efficiency of the IR before instruction selection.
            </li>
            <li>
              <strong>Instruction Selection & Scheduling:</strong> Mapping optimized IR to assembly instructions and scheduling execution.
            </li>
            <li>
              <strong>Register Allocation:</strong> Managing hardware resources effectively for execution.
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            - Key Features
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li>AI-Based Code Optimization</li>
            <li>Compilation Simulation</li>
            <li>Memory Analysis & Visualization</li>
            <li>OCR-Based Code Extraction</li>
            <li>Multi-Platform Support (Web & Mobile)</li>
            <li>Advanced Security Features</li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            - Objective & Impact
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            The primary goal of HAMSY Compiler is to assist developers, students, and researchers in understanding and optimizing C++
            code while visualizing the intricate steps of the compilation process. By leveraging AI models developed from scratch,
            this project eliminates the dependency on third-party APIs and provides a unique learning platform for programming enthusiasts.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            - Technology Stack
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li>
              <strong>Frontend:</strong> React (for the web interface), Flutter (for mobile and desktop applications)
            </li>
            <li>
              <strong>Backend:</strong> .NET Core (for API services)
            </li>
            <li>
              <strong>AI Models:</strong> Neural networks for code optimization and OCR
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <p style={{ lineHeight: "1.6", fontStyle: "italic" }}>
            HAMSY Compiler is not just a tool for code compilation but a groundbreaking innovation that merges artificial intelligence
            with traditional compiler methodologies. By providing AI-powered optimizations and visual insights, it paves the way for a
            smarter and more efficient coding experience.
          </p>
        </section>

        {/* Add Scroll Buttons */}
        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;