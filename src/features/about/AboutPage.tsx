import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "../../features/css/style.css";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Measure container height
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

  // GSAP animations
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2");
      const content = section.querySelectorAll("p, ul, li");
      
      // Heading animation
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }

      // Content animation
      if (content.length > 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color px-5 py-4"
        style={{ minHeight: "100vh" }}
      >
        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-project-diagram mr-2" style={{ color: "#706CEE" }}></i>
            Project Title
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>Compiler Simulation with AI Optimization and Memory Visualization</strong>
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-info-circle mr-2" style={{ color: "#706CEE" }}></i>
            Project Overview
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            HAMSY Compiler aims to revolutionize the way C++ code is optimized and analyzed by utilizing neural networks to improve
            performance and reduce unnecessary computations. Unlike traditional compilers, which focus solely on translating code
            into machine language, HAMSY introduces AI-driven optimizations while offering detailed insights into compilation stages:
          </p>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Lexical Analysis:</strong> Tokenizing the source code and generating a symbol table.
            </li>
            <li className="mb-2">
              <i className="fas fa-sitemap mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Syntax Analysis:</strong> Constructing a parse tree and validating syntax structure.
            </li>
            <li className="mb-2">
              <i className="fas fa-tree mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Semantic Analysis:</strong> Generating an Abstract Syntax Tree (AST) and performing type checking.
            </li>
            <li className="mb-2">
              <i className="fas fa-cogs mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Intermediate Representation (IR) Generation:</strong> Transforming the AST into an intermediate form.
            </li>
            <li className="mb-2">
              <i className="fas fa-tachometer-alt mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Optimization:</strong> Enhancing the efficiency of the IR before instruction selection.
            </li>
            <li className="mb-2">
              <i className="fas fa-microchip mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Instruction Selection & Scheduling:</strong> Mapping optimized IR to assembly instructions.
            </li>
            <li className="mb-2">
              <i className="fas fa-memory mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Register Allocation:</strong> Managing hardware resources effectively for execution.
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-star mr-2" style={{ color: "#706CEE" }}></i>
            Key Features
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-brain mr-2" style={{ color: "#706CEE" }}></i>
              AI-Based Code Optimization
            </li>
            <li className="mb-2">
              <i className="fas fa-cog mr-2" style={{ color: "#706CEE" }}></i>
              Compilation Simulation
            </li>
            <li className="mb-2">
              <i className="fas fa-chart-bar mr-2" style={{ color: "#706CEE" }}></i>
              Memory Analysis & Visualization
            </li>
            <li className="mb-2">
              <i className="fas fa-camera mr-2" style={{ color: "#706CEE" }}></i>
              OCR-Based Code Extraction
            </li>
            <li className="mb-2">
              <i className="fas fa-mobile-alt mr-2" style={{ color: "#706CEE" }}></i>
              Multi-Platform Support (Web & Mobile)
            </li>
            <li className="mb-2">
              <i className="fas fa-shield-alt mr-2" style={{ color: "#706CEE" }}></i>
              Advanced Security Features
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-bullseye mr-2" style={{ color: "#706CEE" }}></i>
            Objective & Impact
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            The primary goal of HAMSY Compiler is to assist developers, students, and researchers in understanding and optimizing C++
            code while visualizing the intricate steps of the compilation process. By leveraging AI models developed from scratch,
            this project eliminates the dependency on third-party APIs and provides a unique learning platform for programming enthusiasts.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-tools mr-2" style={{ color: "#706CEE" }}></i>
            Technology Stack
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fab fa-react mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Frontend:</strong> React (for the web interface), Flutter (for mobile and desktop applications)
            </li>
            <li className="mb-2">
              <i className="fas fa-server mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Backend:</strong> .NET Core (for API services)
            </li>
            <li className="mb-2">
              <i className="fas fa-robot mr-2" style={{ color: "#706CEE" }}></i>
              <strong>AI Models:</strong> Neural networks for code optimization and OCR
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <p style={{ lineHeight: "1.6", fontStyle: "italic" }}>
            <i className="fas fa-quote-left mr-2" style={{ color: "#706CEE" }}></i>
            HAMSY Compiler is not just a tool for code compilation but a groundbreaking innovation that merges artificial intelligence
            with traditional compiler methodologies. By providing AI-powered optimizations and visual insights, it paves the way for a
            smarter and more efficient coding experience.
          </p>
        </section>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;