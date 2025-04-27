import React from 'react';
import { Link } from 'react-router-dom';
import './MemoryPage.css';
import Header from '../../../app/layout/Header';

const memoryConcepts = [
  {
    name: 'Memory',
    description: 'Memory in a computer is where data and instructions are stored for processing. It includes various types like RAM, ROM, and cache, organized into addresses for efficient access by the CPU.'
  },
  {
    name: 'Stack',
    description: 'The stack is a region of memory used for static memory allocation, managing function calls and local variables. It operates on a Last-In-First-Out (LIFO) basis, with data pushed and popped as functions are called and returned.'
  },
  {
    name: 'Heap',
    description: 'The heap is a region of memory used for dynamic memory allocation, where data with variable sizes or lifetimes is stored. It is managed by the program or runtime, allowing flexible allocation but requiring careful handling to avoid memory leaks.'
  }
];

const MemoryPage: React.FC = () => {
  return (
    <>
        <Header />

        <div className="memory-container">
        <header className="memory-header">
            <h1>Memory Concepts</h1>
            <p>Explore the fundamental concepts of memory management in computing, including memory, stack, and heap.</p>
        </header>
        <section className="memory-list">
            {memoryConcepts.map((concept, index) => (
            <div key={index} className="memory-item">
                <h2>{concept.name}</h2>
                <p>{concept.description}</p>
            </div>
            ))}
        </section>
        <div className="navigation">
            <Link
            to="/memory-graphical-visualization"
            className="btn arrow-button next-arrow"
            role="button"
            aria-label="Navigate to Visualization Page"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = '/visualization';
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
            >
                <path d="M9 18l6-6-6-6" />
            </svg>
            </Link>
        </div>
        </div>
    </>
  );
};

export default MemoryPage;