import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter, faWhatsapp, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";
import "../../features/css/style.css";
import "./Footer.css";

const Footer = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Animate links
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll("a");
      if (links.length > 0) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    }

    // Animate social icons
    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll("svg");
      if (icons.length > 0) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.5,
          }
        );
      }
    }
  }, []);

  return (
    <div className="container-fluid text-white text-center p-3 footer-container">
      <h4 ref={logoRef} className="mt-4 mb-4">
        <b style={{ color: "#706CEE" }}>HAMSY</b>
      </h4>
      <div ref={linksRef} className="links mb-4">
        <Link className="footer-link" to="/">
          Home
        </Link>
        <Link className="footer-link" to="/about">
          About
        </Link>
        <Link className="footer-link" to="/what-is-compiler">
          Compiler
        </Link>
        <Link className="footer-link" to="/contact">
          Contact
        </Link>
      </div>
      <div ref={socialsRef} className="mb-4 social-icons">
        <a href="" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faInstagram}
            className="footer-icon"
            style={{ color: "#706CEE", fontSize: "25px" }}
          />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faTwitter}
            className="footer-icon"
            style={{ color: "#706CEE", fontSize: "25px" }}
          />
        </a>
        <a href="https://wa.me/01028110927" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="footer-icon"
            style={{ color: "#706CEE", fontSize: "25px" }}
          />
        </a>
        <a href="https://www.facebook.com/adham4040" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faFacebook}
            className="footer-icon"
            style={{ color: "#706CEE", fontSize: "25px" }}
          />
        </a>
      </div>
      <hr style={{ border: "1px solid #706CEE" }} />
      <div style={{ color: "white", padding: "10px" }}>
        © {new Date().getFullYear()} HAMSY Compiler. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;