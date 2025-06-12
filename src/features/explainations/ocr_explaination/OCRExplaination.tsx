import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../css/style.css";
import Header from "../../../app/layout/Header";
import Footer from "../../../app/layout/Footer";
import ScrollButtons from "../../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);

const OCRExplaination: React.FC = () => {
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
        className="container-fluid text-xl text-white main-background-color"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <section ref={sectionRef} className="mx-5">
          <h2 className="text-center text-white mb-5">Optical Character Recognition</h2>
          <div className="content-card p-4 mb-4 rounded shadow-lg" style={{ backgroundColor: "#282828", border: "1px solid #282828" }}>
            <h4 className="text-white mb-4">Overview</h4>
            <p className="text-white mb-5">
              Optical Character Recognition transforms images of typed, handwritten, or printed text into machine-readable text data. In compilers, it enables preprocessing of source code from images, such as scanned documents or whiteboard sketches, for further compilation.
            </p>
            <h4 className="text-white mb-4">Key Details</h4>
            <p className="text-white mb-5">
              The OCR process includes image preprocessing (noise reduction, binarization), character segmentation (isolating characters), feature extraction (shape identification), and classification (mapping to characters). Traditional methods use pattern matching or statistical models like Hidden Markov Models, while modern approaches employ deep learning with Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs). Applications span document digitization and accessibility tools, with challenges including diverse fonts, degraded images, and handwriting variability.
            </p>
            <h4 className="text-white mb-4">Advanced Technical Insights</h4>
            <p className="text-white mb-0">
              Feature extraction leverages Hough transforms for line detection or Fourier descriptors for shapes, while classification uses Bayesian classifiers or neural network softmax outputs. Deep learning models like Tesseract combine CNNs with LSTMs for end-to-end recognition, evaluated via Character Error Rate (CER) = (Substitutions + Insertions + Deletions) / Total Characters. Preprocessing employs adaptive thresholding (Otsu’s method) and morphological operations to remove noise, with skew correction via Radon transforms. Scalability requires GPU-accelerated CNNs, and robustness is enhanced by data augmentation with synthetic degradation.
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

export default OCRExplaination;