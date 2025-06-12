import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../css/style.css";
import Header from "../../../app/layout/Header";
import Footer from "../../../app/layout/Footer";
import ScrollButtons from "../../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);

const CompilerWorking: React.FC = () => {
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
          <h2 className="text-center text-white mb-5">How the Compiler Works</h2>
          <div className="content-card p-4 mb-4 rounded shadow-lg" style={{ backgroundColor: "#282828", border: "1px solid #282828" }}>
<h4 className="text-white mb-3">Overview</h4>
            <p className="text-white mb-3">
              A compiler is a software tool that translates high-level programming language source code into low-level machine code or intermediate representations executable by a computer. It operates through a series of phases, each handling a specific transformation, from lexical analysis to code generation.
            </p>
            <h4 className="text-white mb-3">Key Details</h4>
            <p className="text-white mb-0">
              Compilation involves lexical analysis (tokenization), syntax analysis (parsing), semantic analysis (type checking), intermediate code generation (IR creation), optimization (code improvement), and code generation (machine code production). Compilers detect errors like syntax issues or type mismatches, providing diagnostics. Optimization minimizes execution time and memory usage through techniques like loop unrolling. Compilers are critical in software development, embedded systems, and high-performance computing, with examples like GCC and LLVM.
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

export default CompilerWorking;