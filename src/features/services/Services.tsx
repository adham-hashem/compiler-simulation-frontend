import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const hexagonRefs = useRef<HTMLDivElement[]>([]);

  // Add refs to hexagon items
  const addToHexagonRefs = (el: HTMLDivElement | null) => {
    if (el && !hexagonRefs.current.includes(el)) {
      hexagonRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animate title and description
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate hexagon items with stagger
    hexagonRefs.current.forEach((hex, index) => {
      gsap.fromTo(
        hex,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: hex,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <main className="site-wrapper">
        <div className="pt-table desktop-768">
          <div
            className="pt-tablecell page-home relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay"></div>

            <div className="container">
              <div className="row">
                <div className="col-xs-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                  <div ref={titleRef} className="page-title home text-center">
                    <span className="heading-page">
                      Welcome to{" "}
                      <span style={{ color: "#706CEE" }}>HAMSY</span> Compiler
                      Services
                    </span>
                    <p className="mt-3 text-white">
                      HAMSY Compiler is an AI-powered code optimization and
                      compilation simulation tool. It enhances code efficiency
                      while visualizing memory and compilation stages like AST,
                      parse trees, and IR generation. 🚀
                    </p>
                  </div>

                  <div className="hexagon-menu clear">
                    {[
                      {
                        icon: "fa-universal-access",
                        title: "Code Editor",
                        link: "/source-code",
                      },
                      {
                        icon: "fa-bullseye",
                        title: "Compiler",
                        link: "/what-is-compiler",
                      },
                      { icon: "fa-braille", title: "Visualizer", link: "/visualization" },
                      {
                        icon: "fa-id-badge",
                        title: "Memory Analysis",
                        link: "/memory-graphical-visualization",
                      },
                      { icon: "fa-life-ring", title: "AI Optimization", link: "/ai-optimization" },
                      {
                        icon: "fa-clipboard",
                        title: "Documentation",
                        link: "/docs",
                      },
                      { icon: "fa-map-signs", title: "Contact", link: "/contact" },
                    ].map((item, index) => (
                      <div
                        ref={addToHexagonRefs}
                        className="hexagon-item"
                        key={index}
                      >
                        <div className="hex-item">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        <div className="hex-item">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        <Link to={item.link} className="hex-content">
                          <span className="hex-content-inner">
                            <span className="icon">
                              <i className={`fas ${item.icon} mr-2`}></i>
                            </span>
                            <span className="title">{item.title}</span>
                          </span>
                          <svg
                            viewBox="0 0 173.20508075688772 200"
                            height="200"
                            width="174"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                              fill="#1e2530"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;