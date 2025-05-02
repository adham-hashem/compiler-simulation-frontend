import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/style.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Empowering from "../../app/images/Empowering.png";
import Mission from "../../app/images/Mission.png";
import Vision from "../../app/images/Vision.png";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [showVisualizerButtons, setShowVisualizerButtons] = useState(false);
  const text = "Welcome To HAMSY Compiler";
  const speed = 100;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

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
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Main content animation
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // Button animation
    if (buttonContainerRef.current) {
      const buttons = buttonContainerRef.current.querySelectorAll(".btn-grad");
      if (buttons.length > 0) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      }
    }

    // Section animations
    sectionRefs.current.forEach((section) => {
      const img = section.querySelector("img");
      const text = section.querySelectorAll("h2, p");
      const button = section.querySelector(".learn-more-button");

      // Image parallax
      if (img) {
        gsap.fromTo(
          img,
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }

      // Text animation
      if (text.length > 0) {
        gsap.fromTo(
          text,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
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

      // Button animation
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
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

  const handleVisualizerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowVisualizerButtons(!showVisualizerButtons);
    if (!showVisualizerButtons) {
      gsap.fromTo(
        ".visualizer-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  return (
    <>
      <Header />
      <div ref={containerRef} className="main-background-color">
        <div className="main-content" ref={mainContentRef}>
          <div className="main-content-h1-container">
            <h1 className="main-content-h1">
              {typedText.split("HAMSY").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{ color: "#706CEE" }}>HAMSY</span>
                  )}
                </React.Fragment>
              ))}
            </h1>
          </div>
          <p className="main-content-p">
            HAMSY Compiler is an AI-powered code optimization and compilation
            simulation tool. It enhances code efficiency while visualizing memory
            and compilation stages like AST, parse trees, and IR generation. 🚀
          </p>
          <div className="button-container" ref={buttonContainerRef}>
            <Link to="/source-code" className="btn-grad">
              Code Editor
            </Link>
            <Link to="#" className="btn-grad" onClick={handleVisualizerClick}>
              Visualizer
            </Link>
          </div>
          {showVisualizerButtons && (
            <div className="visualizer-buttons">
              <Link to="/visualization" className="visualizer-btn">
                Compiler
              </Link>
              <Link
                to="/memory-graphical-visualization"
                className="visualizer-btn"
              >
                Memory
              </Link>
            </div>
          )}
        </div>

        <div className="container-fluid">
          <div
            className="main-background-color"
            style={{ height: "40px" }}
          ></div>

          <section
            ref={addToSectionRefs}
            className="div-background-color empowering-section mb-2 mx-5 rounded-div"
            style={{ padding: "80px 40px 40px 40px" }}
          >
            <div className="row">
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">
                  Empowering Developers With A Seamless{" "}
                  <span className="main-color">Compiler</span>
                </h2>
                <p className="text-white mb-5">
                  We are a team of passionate developers, designers, and engineers
                  dedicated to building an intuitive and powerful online compiler.
                  Our mission is to empower programmers with a seamless coding
                  experience, making development faster, easier, and more
                  efficient.
                </p>
                <Link
                  to=""
                  className="btn py-2 px-5 learn-more-button"
                  style={{ border: "none" }}
                >
                  Learn More
                </Link>
              </div>
              <div className="col-md-6">
                <img
                  src={Empowering}
                  className="img-fluid rounded shadow-lg"
                  alt="Empowering Developers"
                />
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section
            ref={addToSectionRefs}
            className="mb-2 mx-5"
            style={{ padding: "80px 0 20px 0" }}
          >
            <div className="row">
              <div className="col-md-6">
                <img
                  src={Mission}
                  className="img-fluid rounded shadow-lg"
                  alt="Our Mission"
                />
              </div>
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">Our Mission</h2>
                <p className="text-white mb-5">
                  To create an intuitive and powerful online compiler that
                  enhances coding efficiency, simplifies development, and empowers
                  programmers of all levels.
                </p>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          {/* For desktop */}
          <section
            ref={addToSectionRefs}
            className="mb-2 mx-5 hide-on-mobile"
            style={{ padding: "80px 0 30px 0" }}
          >
            <div className="row">
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">Our Vision</h2>
                <p className="text-white mb-5">
                  To revolutionize the coding experience by providing a seamless,
                  accessible, and innovative platform that fosters learning,
                  collaboration, and creativity in software development.
                </p>
              </div>
              <div className="col-md-6">
                <img
                  src={Vision}
                  className="img-fluid rounded shadow-lg"
                  alt="Our Vision"
                />
              </div>
            </div>
          </section>

          {/* For mobile */}
          <section
            ref={addToSectionRefs}
            className="mb-2 mx-5 mobile-only"
            style={{ padding: "20px 0 10px 0" }}
          >
            <div className="row">
              <div className="col-md-6">
                <img
                  src={Vision}
                  className="img-fluid rounded shadow-lg"
                  alt="Our Vision"
                />
              </div>
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">Our Vision</h2>
                <p className="text-white mb-5">
                  To revolutionize the coding experience by providing a seamless,
                  accessible, and innovative platform that fosters learning,
                  collaboration, and creativity in software development.
                </p>
              </div>
            </div>
          </section>

          {/* Meet Our Team */}
          <section
            ref={addToSectionRefs}
            className="mx-5"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="row">
              <div className="col-md-12 mb-5">
                <h2 className="text-white text-center mb-5">
                  Meet Our Team Members
                </h2>
              </div>
            </div>
          </section>

          <ScrollButtons containerHeight={containerHeight} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;