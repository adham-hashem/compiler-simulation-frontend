import React from 'react';
import { Link } from 'react-router-dom';
import './CompilationStagesPage.css';
import Header from '../../../app/layout/Header';

const compilationStages = [
  {
    name: 'Lexical Analysis',
    description: 'Breaks the source code into tokens, such as keywords, identifiers, and symbols, removing whitespace and comments.'
  },
  {
    name: 'Syntax Analysis',
    description: 'Parses tokens to create a parse tree, ensuring the code adheres to the grammar of the programming language.'
  },
  {
    name: 'Semantic Analysis',
    description: 'Checks the parse tree for semantic correctness, such as type checking and variable declarations, producing an abstract syntax tree.'
  },
  {
    name: 'Intermediate Representation',
    description: 'Translates the abstract syntax tree into an intermediate code format, optimizing for further processing.'
  },
  {
    name: 'Instruction Selection',
    description: 'Maps intermediate code to target machine instructions, selecting efficient operations for the architecture.'
  },
  {
    name: 'Register Allocation',
    description: 'Assigns variables to machine registers or memory, optimizing for performance and minimizing memory usage.'
  },
  {
    name: 'Instruction Scheduling',
    description: 'Reorders instructions to maximize parallelism and minimize execution time, producing the final assembly code.'
  }
];

const CompilationStagesPage: React.FC = () => {
  return (
    <>
        <Header />

        <div className="stages-container">
        <header className="stages-header">
            <h1>Compilation Stages Visualization</h1>
            <p>Understand the key phases of the compilation process that transform source code into executable machine code.</p>
        </header>
        <section className="stages-list">
            {compilationStages.map((stage, index) => (
            <div key={index} className="stage-item">
                <h2>{stage.name}</h2>
                <p>{stage.description}</p>
            </div>
            ))}
        </section>
        <div className="navigation">
            <Link
            to="/visualization"
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

export default CompilationStagesPage;