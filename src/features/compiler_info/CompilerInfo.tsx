import React, { useEffect, useRef } from 'react';
import './CompilerInfo.css';
import 'particles.js/particles';
import Header from '../../app/layout/Header';
import Footer from '../../app/layout/Footer';

const CompilerInfo: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize particles
    if (window.particlesJS && particlesRef.current) {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: { value: '#ffffff' },
          shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000000' },
            polygon: { nb_sides: 5 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    }

    const countParticles = document.querySelector('.js-count-particles') as HTMLElement | null;
    
    let animationFrameId: number;
    const update = () => {
      if (window.pJSDom?.[0]?.pJS?.particles?.array && countParticles) {
        countParticles.textContent = window.pJSDom[0].pJS.particles.array.length.toString();
      }
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (window.pJSDom?.[0]?.pJS?.fn?.vendors?.destructor) {
        window.pJSDom[0].pJS.fn.vendors.destructor();
      }
    };
  }, []);

  return (
    <>
    <Header />
    <div className="compiler-container">
      <div id="particles-js" ref={particlesRef} className="particles-container"></div>
      {/* <div className="count-particles">
        <span className="js-count-particles">--</span> particles
      </div> */}
      <div className="compiler-content">
        <h1>What is a Compiler?</h1>
        <p>
          A compiler is a special program that translates source code written in a high-level programming language 
          (like C++, Java, or Python) into machine code or intermediate code that can be executed by a computer. 
          It acts as a bridge between human-readable code and the binary instructions that a computer's processor understands.
        </p>
        
        <h2>What Does a Compiler Do?</h2>
        <ul>
          <li><strong>Lexical Analysis:</strong> Breaks down the source code into tokens (basic building blocks like keywords, operators).</li>
          <li><strong>Syntax Analysis:</strong> Checks if the code follows the grammatical rules of the programming language.</li>
          <li><strong>Semantic Analysis:</strong> Verifies the meaning and logic of the code (e.g., type checking).</li>
          <li><strong>Code Generation:</strong> Produces the target machine code or intermediate representation.</li>
          <li><strong>Optimization:</strong> Improves the code's efficiency (speed, size, or resource usage).</li>
          <li><strong>Error Handling:</strong> Reports syntax errors, logical errors, or warnings to the programmer.</li>
        </ul>
        <p>
          In essence, a compiler takes your human-friendly code and transforms it into something a computer can execute, 
          while also helping catch mistakes and optimize performance.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CompilerInfo;