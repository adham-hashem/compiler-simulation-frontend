import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../../features/context/ThemeContext";
import Header from "../../../app/layout/Header";
import Footer from "../../../app/layout/Footer";
import ScrollButtons from "../../scrollButtons/ScrollButtons";
import "../../../features/css/style.css";
import "./Explore.css";

gsap.registerPlugin(ScrollTrigger);

const Explore: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
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
    if (buttonContainerRef.current) {
      const buttons = buttonContainerRef.current.querySelectorAll(".explore-btn");
      if (buttons.length > 0) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: buttonContainerRef.current, start: "top 80%" },
          }
        );
        buttons.forEach((btn) => {
          btn.classList.add("animate__animated", "animate__pulse", "animate__fast");
        });
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className={`container-fluid main-background-color explore-container ${theme}`}
      >
        <h2 className="text-center mb-5">Explore HAMSY Compiler</h2>
        <p className="text-center mb-5 mx-auto explore-intro">
          Dive into the core components of the HAMSY Compiler. Learn about each stage of compilation, memory visualization, and AI-driven optimization that powers our innovative platform.
        </p>
        <div ref={buttonContainerRef} className="row mx-3">
          {[
            { title: "Compiler Working", path: "/compiler-working-explaination" },
            { title: "Lexical Analysis", path: "/lexical-analysis-explaination" },
            { title: "Syntax Analysis", path: "/syntax-analysis-explaination" },
            { title: "Symbol Tables", path: "/symbol-tables-explaination" },
            { title: "Semantic Analysis", path: "/semantic-analysis-explaination" },
            { title: "Intermediate Code Generation", path: "/intermediate-code-generation-explaination" },
            { title: "Intermediate Code Optimization", path: "/intermediate-code-optimization-explaination" },
            { title: "Instruction Selection", path: "/instruction-selection-explaination" },
            { title: "Register Allocation", path: "/register-allocation-explaination" },
            { title: "Register Scheduling", path: "/register-scheduling-explaination" },
            { title: "Memory Analysis", path: "/memory-analysis-explaination" },
            { title: "AI Code Optimization", path: "/ai-code-optimization-explaination" },
            { title: "OCR (Optical Character Recognition)", path: "/ocr-explaination" },
          ].map((item, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">
              <Link to={item.path} className="explore-btn btn py-3 px-4 w-100">
                {item.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="row mx-0 mt-5">
          <div className="col text-center">
            <Link to="/" className="btn nextButton">Back to Home</Link>
          </div>
        </div>
        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default Explore;