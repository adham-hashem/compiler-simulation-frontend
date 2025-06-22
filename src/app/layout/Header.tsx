import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../../features/css/style.css";
import "./Header.css";

function Header() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);

  // Add refs to nav items
  const addToNavItemsRef = (el: HTMLLIElement | null) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate navbar brand
    if (brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animate nav items with stagger
    if (navItemsRef.current.length > 0) {
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -20 },
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

    // Animate contact button
    if (contactButtonRef.current) {
      gsap.fromTo(
        contactButtonRef.current,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-sm navbar-dark sticky-top"
    >
      <div className="container-fluid">
        <Link
          ref={brandRef}
          className="navbar-brand"
          to="/"
        >
          <b>HAMSY</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="mynavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {/* <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li> */}
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/explore">
                Explore
              </Link>
            </li>
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/why-hamsy">
                Why HAMSY?
              </Link>
            </li>
          </ul>
          <div className="contact-button-container">
            <Link
              ref={contactButtonRef}
              className="btn contact-us-button"
              to="/contact"
            >
              <i className="fas fa-envelope me-2"></i>Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;