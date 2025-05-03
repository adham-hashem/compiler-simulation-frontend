import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './VisualizationPage.css';

interface VisualizationItem {
  id: string;
  name: string;
  videoSrc: string;
  ariaLabel: string;
}

const visualizations: VisualizationItem[] = [
  {
    id: 'lexical-analysis',
    name: 'Lexical Analysis',
    videoSrc: '/assets/lexical analysis visualization.mp4',
    ariaLabel: 'Lexical Analysis Visualization Video',
  },
  {
    id: 'parse-tree',
    name: 'Syntax Analysis',
    videoSrc: '/assets/parse tree visualization.mp4',
    ariaLabel: 'Parse Tree Visualization Video',
  },
  {
    id: 'abstract-syntax-tree',
    name: 'Semantic Analysis',
    videoSrc: '/assets/abstract syntax tree visualization.mp4',
    ariaLabel: 'Abstract Syntax Tree Visualization Video',
  },
  {
    id: 'intermediate-representation',
    name: 'Intermediate Representation',
    videoSrc: '/assets/intermediate representation visualization.mp4',
    ariaLabel: 'Intermediate Representation Visualization Video',
  },
  {
    id: 'instruction-selection',
    name: 'Instruction Selection',
    videoSrc: '/assets/instruction selection visualization.mp4',
    ariaLabel: 'Instruction Selection Visualization Video',
  },
  {
    id: 'register-allocation',
    name: 'Register Allocation',
    videoSrc: '/assets/registers visualization.mp4',
    ariaLabel: 'Registers Visualization Video',
  },
  {
    id: 'instruction-scheduling',
    name: 'Instruction Scheduling',
    videoSrc: '/assets/instruction scheduling visualization.mp4',
    ariaLabel: 'Instruction Scheduling Visualization Video',
  },
  {
    id: 'all-compilation-stages',
    name: 'All Compilation Stages',
    videoSrc: '/assets/all compilation stages.mp4',
    ariaLabel: 'All Compilation Stages Visualization Video',
  },
];

const VisualizationPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [selectedViz, setSelectedViz] = useState<string>(visualizations[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true); // Show popup on page load
  const [displayMode, setDisplayMode] = useState<'separate' | 'all'>('separate'); // Track display mode

  // Handle video playback: only load and play after popup is closed
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPopupOpen) return; // Skip if popup is open

    console.log('Loading video:', selectedViz); // Debug log

    // Set playback rate and play
    const setPlaybackAndPlay = () => {
      video.playbackRate = 0.7;
      console.log('Set playbackRate to 0.7'); // Debug log
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
  }, [selectedViz, isPopupOpen]);

  // Initialize GSAP animation for nav list
  useEffect(() => {
    if (listRef.current) {
      console.log('Initializing GSAP for nav list'); // Debug log
      gsap.set(listRef.current, { x: '-100%', visibility: 'hidden', immediateRender: true });
    }
  }, []);

  // Toggle menu animation and visibility
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
          setIsPopupOpen(false); // Close popup without setting mode
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

  const handleVizSelect = (id: string) => {
    console.log('Selected visualization:', id); // Debug log
    setSelectedViz(id);
    setIsMenuOpen(false);
  };

  const handleSeparateStages = () => {
    console.log('Display stages separately selected'); // Debug log
    setDisplayMode('separate');
    setSelectedViz(visualizations[0].id); // Default to first stage
    setIsPopupOpen(false);
  };

  const handleAllStages = () => {
    console.log('Display all compilations selected'); // Debug log
    setDisplayMode('all');
    setSelectedViz('all-compilation-stages'); // Select all stages video
    setIsPopupOpen(false);
  };

  const selectedVisualization = visualizations.find((viz) => viz.id === selectedViz);

  // Filter visualizations based on displayMode
  const navVisualizations =
    displayMode === 'separate'
      ? visualizations.filter((viz) => viz.id !== 'all-compilation-stages')
      : visualizations.filter((viz) => viz.id === 'all-compilation-stages');

  return (
    <div className="visualization-container">
      {/* Video Container: Blurred when popup is open */}
      <div className={`video-container ${isPopupOpen ? 'blurred' : ''}`}>
        <video
          ref={videoRef}
          muted
          playsInline
          className="visualization-video"
          aria-label={selectedVisualization?.ariaLabel}
          preload="metadata"
        >
          <source src={selectedVisualization?.videoSrc} type="video/mp4" />
          Your browser does not support the video tag. Please download the video
          from <a href={selectedVisualization?.videoSrc}>here</a>.
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
            aria-label="Compiler Stages Information"
          >
            <h2>Compiler Stages</h2>
            <p>
              A compiler translates high-level code into machine code through several stages.
              Choose how you want to view the stages:
            </p>
            <ul>
              <li><strong>Lexical Analysis</strong>: Breaks code into tokens.</li>
              <li><strong>Syntax Analysis</strong>: Parses tokens into a syntax tree.</li>
              <li><strong>Semantic Analysis</strong>: Checks for semantic correctness.</li>
              <li><strong>Intermediate Representation</strong>: Generates an intermediate code.</li>
              <li><strong>Instruction Selection</strong>: Maps code to target instructions.</li>
              <li><strong>Register Allocation</strong>: Assigns variables to registers.</li>
              <li><strong>Instruction Scheduling</strong>: Optimizes instruction order.</li>
            </ul>
            <div className="popup-button-container">
              <button
                className="popup-action-button"
                onClick={handleSeparateStages}
                aria-label="Display compilation stages separately"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSeparateStages();
                  }
                }}
              >
                Display Stages Separately
              </button>
              <button
                className="popup-action-button"
                onClick={handleAllStages}
                aria-label="Display all compilation stages at once"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAllStages();
                  }
                }}
              >
                Display All Stages
              </button>
            </div>
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
            className="nav-item"
            aria-label="Navigate to Home Page"
            onClick={() => {
              console.log('Home clicked'); // Debug log
              setIsMenuOpen(false);
            }}
          >
            Home
          </Link>
          {navVisualizations.map((viz) => (
            <div
              key={viz.id}
              className={`nav-item ${selectedViz === viz.id ? 'nav-item--active' : ''}`}
              onClick={() => handleVizSelect(viz.id)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${viz.name} Visualization`}
              aria-current={selectedViz === viz.id ? 'true' : 'false'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleVizSelect(viz.id);
                }
              }}
            >
              {viz.name}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default VisualizationPage;