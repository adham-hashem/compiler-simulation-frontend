import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import "./HomePage.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Empowering from "../../app/images/Empowering.png";
import Mission from "../../app/images/Mission.png";
import Vision from "../../app/images/Vision.png";
import ScrollButtons from "../scrollButtons/ScrollButtons";

const HomePage: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [showVisualizerButtons, setShowVisualizerButtons] = useState(false);
  const text = "Welcome To HAMSY Compiler";
  const speed = 100; // text speed in milliseconds
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

  const handleVisualizerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent navigation
    setShowVisualizerButtons(!showVisualizerButtons); // Toggle buttons
  };

  return (
    <>
      <Header />
      <div ref={containerRef} className="main-background-color">
        {/* Main Content Section */}
        <div className="main-content">
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
            HAMSY Compiler is an AI-powered code optimization and compilation simulation tool.
            It enhances code efficiency while visualizing memory and compilation
            stages like AST, parse trees, and IR generation. 🚀
          </p>
          <div className="button-container">
            <Link to="/source-code" className="btn-grad">
              Code Editor
            </Link>
            <Link
              to="#"
              className="btn-grad"
              onClick={handleVisualizerClick}
            >
              Visualizer
            </Link>
          </div>
          {showVisualizerButtons && (
            <div className="visualizer-buttons">
              <Link to="/visualization" className="visualizer-btn">
                Compiler
              </Link>
              <Link to="/memory-graphical-visualization" className="visualizer-btn">
                Memory
              </Link>
              {/* <Link to="/registers-visualization" className="visualizer-btn">
                Registers
              </Link> */}
            </div>
          )}
        </div>

        {/* Other Sections */}
        <div className="container-fluid">
          <div className="main-background-color" style={{ height: "40px" }}></div>

          {/* Empowering Section */}
          <div className="div-background-color empowering-section mb-2 mx-5 rounded-div" style={{ padding: "80px 40px 40px 40px" }}>
            <div className="row">
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">
                  Empowering Developers With A Seamless <span className="main-color">Compiler</span>
                </h2>
                <p className="text-white mb-5">
                  We are a team of passionate developers, designers, and engineers dedicated to building an intuitive and powerful online compiler.
                  Our mission is to empower programmers with a seamless coding experience, making development faster, easier, and more efficient.
                </p>
                <Link to="" className="btn py-2 px-5 learn-more-button" style={{ border: "none" }}>
                  Learn More
                </Link>
              </div>
              <div className="col-md-6">
                <img src={Empowering} className="img-fluid rounded shadow-lg" alt="Empowering Developers" />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-2 mx-5" style={{ padding: "80px 0 40px 0" }}>
            <div className="row">
              <div className="col-md-6">
                <img src={Mission} className="img-fluid rounded shadow-lg" alt="Our Mission" />
              </div>
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">Our Mission</h2>
                <p className="text-white mb-5">
                  To create an intuitive and powerful online compiler that enhances coding efficiency, simplifies development, and empowers programmers of all levels.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="mb-2 mx-5" style={{ padding: "80px 0 40px 0" }}>
            <div className="row">
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">Our Vision</h2>
                <p className="text-white mb-5">
                  To revolutionize the coding experience by providing a seamless, accessible, and innovative platform that fosters learning, collaboration, and creativity in software development.
                </p>
              </div>
              <div className="col-md-6">
                <img src={Vision} className="img-fluid rounded shadow-lg" alt="Our Vision" />
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mx-5" style={{ padding: "80px 0 40px 0" }}>
            <div className="row">
              <div className="col-md-12 mb-5">
                <h2 className="text-white text-center mb-5">Meet Our Team Members</h2>
              </div>
            </div>
          </div>

          <ScrollButtons containerHeight={containerHeight} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;