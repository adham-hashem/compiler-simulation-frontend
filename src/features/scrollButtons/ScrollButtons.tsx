import React, { useState, useEffect } from "react";
import "./ScrollButtons.css"; // Optional: For styling

const ScrollButtons: React.FC<{ containerHeight: number; threshold?: number }> = ({ containerHeight, threshold = 800 }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  useEffect(() => {
    // Only show buttons if the container height exceeds the threshold
    if (containerHeight <= threshold) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show "Top" button if not at the top
      setShowTopButton(scrollTop > 0);
      // Show "Bottom" button if not at the bottom
      setShowBottomButton(scrollTop + windowHeight < documentHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerHeight, threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  if (containerHeight <= threshold) return null;

  return (
    <div className="scroll-buttons">
      {showTopButton && (
        <button className="scroll-button scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
      {showBottomButton && (
        <button className="scroll-button scroll-to-bottom" onClick={scrollToBottom}>
          ↓
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;