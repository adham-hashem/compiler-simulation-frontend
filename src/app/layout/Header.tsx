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
    gsap.fromTo(
      brandRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Animate nav items with stagger
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

    // Animate contact button
    gsap.fromTo(
      contactButtonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-sm navbar-dark sticky-top"
      style={{
        backgroundColor: "#282828",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="container-fluid">
        <Link
          ref={brandRef}
          className="navbar-brand"
          to="/"
          style={{ color: "var(--main-color)", fontSize: "1.8rem" }}
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
          <ul className="navbar-nav me-auto">
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
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <Link
              ref={contactButtonRef}
              className="btn contact-us-button"
              to="/contact"
            >
              <i className="fas fa-envelope me-3"></i>Contact Us
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;