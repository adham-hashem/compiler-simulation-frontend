import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../features/context/ThemeContext";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "../../features/css/style.css";
import "./WhyHamsy.css";

gsap.registerPlugin(ScrollTrigger);

const WhyHamsy: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  const hamsyDetails = [
    {
      letter: "H",
      members: [
        { name: "Dr. Heba Hamed El Hadidi", role: "Supervisor", description: "Provided expert guidance on compiler design and AI optimization." },
        { name: "Haneen Ahmed Deep Alhasan", role: "CS Student, System Analyst", description: "Designed system architecture and optimized workflows for the HAMSY Compiler." },
      ],
    },
    {
      letter: "A",
      members: [
        { name: "Adham Hashem Mohamed Elbeshbeshy", role: "IT Student, Frontend Developer", description: "Built the intuitive and responsive frontend interface for the compiler." },
        { name: "Ammar Elsayed Elsayed Antar", role: "IT Student, UI Designer", description: "Crafted user-friendly UI designs for seamless user interaction." },
      ],
    },
    {
      letter: "M",
      members: [
        { name: "Mariam Nashaat Badran Eid", role: "CS Student, Backend Developer", description: "Developed robust backend systems for code optimization and visualization." },
      ],
    },
    {
      letter: "S",
      members: [
        { name: "Salah Saad Salah Hafez", role: "CS Student, Application Tester", description: "Ensured the compiler’s reliability through rigorous testing and quality assurance." },
      ],
    },
    {
      letter: "Y",
      members: [
        { name: "Youssef Rafie Mohamed Elbosaty", role: "CS Student, Backend Developer", description: "Engineered backend logic for efficient compilation and AI integration." },
      ],
    },
  ];

  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

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
    sectionRefs.current.forEach((section) => {
      const letter = section.querySelector(".hamsy-letter");
      const cards = section.querySelectorAll(".member-card");

      section.classList.add("animate__animated", "animate__fadeIn");

      if (letter) {
        gsap.fromTo(
          letter,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: section, start: "top 80%" },
          }
        );
        letter.classList.add("animate__animated", "animate__bounceIn");
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 80%" },
          }
        );
        cards.forEach((card) => {
          card.classList.add("animate__animated", "animate__fadeInRight");
        });
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
        className={`container-fluid main-background-color why-hamsy-container ${theme}`}
      >
        <h2 className="text-center mb-5">Why HAMSY?</h2>
        <p className="text-center mb-5 mx-auto why-hamsy-intro">
          The name <span className="highlight">HAMSY</span> reflects the dedicated team behind the HAMSY Compiler. Each letter represents the passionate individuals who brought this AI-powered compiler and visualization tool to life.
        </p>

        {hamsyDetails.map((item, index) => (
          <section key={index} ref={addToSectionRefs} className="why-hamsy-section">
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <h1 className="hamsy-letter">{item.letter}</h1>
              </div>
              <div className="col-md-10">
                {item.members.map((member, idx) => (
                  <div key={idx} className="member-card p-4 mb-3 rounded shadow-lg">
                    <h5>{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                    <p>{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

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

export default WhyHamsy;