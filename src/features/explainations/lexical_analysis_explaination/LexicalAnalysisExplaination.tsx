import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../css/style.css";
import Header from "../../../app/layout/Header";
import Footer from "../../../app/layout/Footer";
import ScrollButtons from "../../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);

const LexicalAnalysisExplaination: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll("h2, p, .content-card");
      sectionRef.current.classList.add("animate__animated", "animate__fadeIn");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
      elements.forEach((el) => {
        el.classList.add("animate__animated", "animate__fadeInUp");
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <section ref={sectionRef} className="mx-5">
          <h2 className="text-center text-white mb-5">Lexical Analysis</h2>
          <div className="content-card p-4 mb-4 rounded shadow-lg" style={{ backgroundColor: "#282828", border: "1px solid #282828" }}>
<h4 className="text-white mb-3">Overview</h4>
            <p className="text-white mb-3">
              Lexical analysis, the first phase of compilation, converts source code into a stream of tokens—atomic units like keywords, identifiers, operators, and literals—by processing the input character stream.
            </p>
            <h4 className="text-white mb-3">Key Details</h4>
            <p className="text-white mb-0">
              It uses regular expressions to match patterns, ignoring whitespace and comments. Finite automata, such as deterministic (DFA) or non-deterministic (NFA), enable efficient token recognition. Errors like invalid characters or malformed tokens are detected. Performance is optimized through table-driven lexers or hand-coded scanners, critical for processing large codebases.
            </p>
</div>
          <div className="row mx-0 mt-5">
            <div className="col text-center">
              <Link to="/explore" className="btn py-2 px-5 nextButton">
                Back to Explore
              </Link>
            </div>
          </div>
        </section>
        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default LexicalAnalysisExplaination;