import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './MemoryGraphicalVisualization.css';

const MemoryGraphicalVisualization: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true); // Show popup on page load

  // Set video playback speed and play when ready, only after popup is closed
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPopupOpen) return; // Skip if popup is open

    console.log('Loading video: Memory Graphical'); // Debug log

    // Function to set playback rate and play
    const setPlaybackAndPlay = () => {
      video.playbackRate = 0.5;
      console.log('Set playbackRate to 0.5'); // Debug log
      video.play().catch((error) => console.error('Video play failed:', error));
    };

    // Handle video ready state
    const onCanPlay = () => {
      console.log('Video can play, setting playback rate'); // Debug log
      setPlaybackAndPlay();
    };

    // Load video source
    video.load();

    // Add event listener for when video is ready
    video.addEventListener('canplay', onCanPlay);

    // Cleanup event listener
    return () => {
      video.removeEventListener('canplay', onCanPlay);
    };
  }, [isPopupOpen]);

  // Initialize GSAP animation for nav list
  useEffect(() => {
    if (listRef.current) {
      console.log('Initializing GSAP for nav list'); // Debug log
      gsap.set(listRef.current, { x: '-100%', visibility: 'hidden', immediateRender: true });
    }
  }, []);

  // Toggle menu animation and visibility with timeline
  useEffect(() => {
    if (listRef.current) {
      console.log('Toggling menu, isMenuOpen:', isMenuOpen); // Debug log
      const tl = gsap.timeline({ overwrite: 'auto' });

      if (isMenuOpen) {
        // Slide in and show
        console.log('Animating menu open'); // Debug log
        tl.to(listRef.current, {
          visibility: 'visible',
          duration: 0,
        }).to(listRef.current, {
          x: '0%',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Slide out, then hide
        console.log('Animating menu close'); // Debug log
        tl.to(listRef.current, {
          x: '-100%',
          duration: 0.3,
          ease: 'power2.in',
        }).to(listRef.current, {
          visibility: 'hidden',
          duration: 0,
        });
      }
    }
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        console.log('Clicked outside, closing menu'); // Debug log
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Focus trap for popup accessibility
  useEffect(() => {
    if (isPopupOpen && popupRef.current) {
      const focusableElements = popupRef.current.querySelectorAll('button, [tabindex="0"]');
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
        if (e.key === 'Escape') {
          setIsPopupOpen(false); // Close popup and remove blur
        }
      };

      firstElement.focus();
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isPopupOpen]);

  const handleArrowClick = () => {
    console.log('Arrow clicked, toggling menu'); // Debug log
    setIsMenuOpen((prev) => !prev);
  };

  const handleClosePopup = () => {
    console.log('Popup closed'); // Debug log
    setIsPopupOpen(false); // Close popup and remove blur
  };

  return (
    <div className="memory-graphical-visualization-container">
      {/* Video Container: Blurred when popup is open */}
      <div className={`video-container ${isPopupOpen ? 'blurred' : ''}`}>
        <video
          ref={videoRef}
          muted
          playsInline
          className="memory-graphical-video"
          aria-label="Memory Graphical Visualization Video"
        >
          <source src="/assets/memory graphical visualization.mp4" type="video/mp4" />
          Your browser does not support the video tag. Please download the video
          from <a href="/assets/memory graphical visualization.mp4">here</a>.
        </video>
      </div>
      {/* Popup: Shown on load, blurs video background */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div
            className="popup"
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-label="Memory Concepts Information"
          >
            <h2>Memory Concepts</h2>
            <p>
              Memory management is critical in programming and involves several key concepts:
            </p>
            <ul>
              <li><strong>Stack</strong>: Stores function call frames and local variables, managed automatically.</li>
              <li><strong>Heap</strong>: Used for dynamic memory allocation, managed manually or by garbage collection.</li>
              <li><strong>Memory Allocation</strong>: Assigns memory for variables and objects during program execution.</li>
              <li><strong>Memory Deallocation</strong>: Frees memory when no longer needed to prevent leaks.</li>
            </ul>
            <button
              className="popup-close-button"
              onClick={handleClosePopup}
              aria-label="Close popup"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClosePopup();
                }
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Sliding Navigation Menu: Not blurred */}
      <div className="sliding-nav" ref={navRef}>
        <div
          className="nav-arrow"
          onClick={handleArrowClick}
          role="button"
          tabIndex={0}
          aria-label="Toggle Navigation Menu"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleArrowClick();
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <nav ref={listRef} className={`nav-list ${isMenuOpen ? 'nav-list--open' : ''}`} role="navigation" aria-label="Visualization Navigation">
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'nav-item--active' : ''}`}
            aria-label="Navigate to Home Page"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            onClick={() => {
              console.log('Home clicked'); // Debug log
              setIsMenuOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            to="/memory-graphical-visualization"
            className={`nav-item ${location.pathname === '/memory-graphical-visualization' ? 'nav-item--active' : ''}`}
            aria-label="Navigate to Memory Graphical Visualization"
            aria-current={location.pathname === '/memory-graphical-visualization' ? 'page' : undefined}
            onClick={() => {
              console.log('Memory Graphical clicked'); // Debug log
              setIsMenuOpen(false);
            }}
          >
            Memory Visualization
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MemoryGraphicalVisualization;