import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import "./ContactPage.css";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<string>("");

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // GSAP animations
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h6");
      const content = section.querySelectorAll("p, ul, li");

      // Heading animation
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }

      // Content animation
      if (content.length > 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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
    });

    // Form fields animation
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input, textarea");
      const button = formRef.current.querySelector(".nextButton");

      gsap.fromTo(
        inputs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );

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
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");
    setTimeout(() => {
      setFormStatus("Message sent successfully!");
      if (formRef.current) {
        formRef.current.reset();
      }
      setTimeout(() => setFormStatus(""), 3000);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="container-fluid text-white main-background-color px-5 py-4">
        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-4">
            <i className="fas fa-envelope mr-2" style={{ color: "#706CEE" }}></i>
            Contact Us
          </h2>
          <p className="lead">
            We’re here to help! If you have any questions, feedback, or inquiries
            about the HAMSY Compiler, feel free to reach out. Our team is always
            available to assist you.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h6 className="mb-3">
            <i className="fas fa-phone-alt mr-2" style={{ color: "#706CEE" }}></i>
            Reach Out to Us
          </h6>
          <p>You can contact us through the following methods:</p>
          <ul className="list-unstyled ms-4">
            <li className="mb-2">
              <i className="fas fa-envelope mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Email:</strong> adhamhashem2025@gmail.com
            </li>
            <li className="mb-2">
              <i className="fas fa-phone mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Phone:</strong> +201028110927
            </li>
            <li className="mb-2">
              <i className="fas fa-map-marker-alt mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Address:</strong> New Damietta, Damietta, Egypt
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h6 className="mb-3">
            <i className="fas fa-paper-plane mr-2" style={{ color: "#706CEE" }}></i>
            Send Us a Message
          </h6>
          <p>
            You can also send us a message directly using the form below, and we
            will get back to you as soon as possible:
          </p>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-sm-5 mt-2">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-user" style={{ color: "#706CEE" }}></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-5 mt-2">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-at" style={{ color: "#706CEE" }}></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-text">
                    <i
                      className="fas fa-tag"
                      style={{ color: "#706CEE" }}
                    ></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-text">
                    <i
                      className="fas fa-comment"
                      style={{ color: "#706CEE" }}
                    ></i>
                  </span>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    rows={4}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="btn nextButton">
                <i className="fas fa-paper-plane mr-2"></i>Send Message
              </button>
            </div>
            {formStatus && (
              <p className="mt-3 text-success">{formStatus}</p>
            )}
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;