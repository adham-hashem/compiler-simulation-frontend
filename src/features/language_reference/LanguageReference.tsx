import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "../../features/css/style.css";
import "./LanguageReference.css";

gsap.registerPlugin(ScrollTrigger);

const LanguageReference: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Measure container height
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

  // GSAP animations
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2");
      const content = section.querySelectorAll("h3, p, ul, li, table, pre");

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color px-5 py-4"
        style={{ minHeight: "100vh" }}
      >
        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-book mr-2" style={{ color: "#706CEE" }}></i>
            Overview
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            This document describes the syntax and grammar rules for our C-like programming language. The language is designed to be simple yet powerful, supporting basic programming constructs including variables, functions, control flow, and arithmetic operations.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-list mr-2" style={{ color: "#706CEE" }}></i>
            Language Features
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Core Characteristics</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-check mr-2" style={{ color: "#706CEE" }}></i>
              Statically typed: All variables must be declared with the int type
            </li>
            <li className="mb-2">
              <i className="fas fa-check mr-2" style={{ color: "#706CEE" }}></i>
              Function-based: Programs are organized around functions with a mandatory main function
            </li>
            <li className="mb-2">
              <i className="fas fa-check mr-2" style={{ color: "#706CEE" }}></i>
              C-like syntax: Familiar syntax for developers with C/C++ background
            </li>
            <li className="mb-2">
              <i className="fas fa-check mr-2" style={{ color: "#706CEE" }}></i>
              Simple control flow: Support for conditional statements and loops
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-sitemap mr-2" style={{ color: "#706CEE" }}></i>
            Program Structure
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Basic Program Layout</h3>
          <p style={{ lineHeight: "1.6" }}>
            Every program in our language follows this structure:
          </p>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Variable Declarations (optional) - Global variable definitions
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Function Definitions (optional) - User-defined functions
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Main Function (required) - Program entry point
            </li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int globalVar = 10;
int addNumbers(int a, int b) {
    return a + b;
}
int main() {
    int result = addNumbers(5, 3);
    return result;
}`}
            </code>
          </pre>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-database mr-2" style={{ color: "#706CEE" }}></i>
            Data Types and Variables
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Variable Declaration</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Syntax: <code className="bg-gray-700 px-1 rounded text-gray-100">int identifier = expression;</code>
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Type: Only int (integer) type is supported
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Initialization: Variables must be initialized when declared
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Scope: Variables can be declared globally or within functions
            </li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int count = 0;
int max = 100;
int result = x + y;`}
            </code>
          </pre>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Variable Assignment</h3>
          <p style={{ lineHeight: "1.6" }}>
            Syntax: <code className="bg-gray-700 px-1 rounded text-gray-100">identifier = expression;</code>
          </p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`count = 5;
result = count * 2;`}
            </code>
          </pre>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-cogs mr-2" style={{ color: "#706CEE" }}></i>
            Functions
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Function Definition</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Return Type: All functions must return int
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Parameters: Functions take exactly two int parameters
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Body: Contains statements and must end with a return statement
            </li>
          </ul>
          <p style={{ lineHeight: "1.6" }}>Syntax:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int functionName(int param1, int param2) {
    // statements
    return expression;
}`}
            </code>
          </pre>
          <p style={{ lineHeight: "1.6" }}>Example:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int multiply(int x, int y) {
    int result = x * y;
    return result;
}`}
            </code>
          </pre>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Main Function</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Required: Every program must have exactly one main function
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Parameters: Takes no parameters
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Return: Must return an integer value
            </li>
          </ul>
          <p style={{ lineHeight: "1.6" }}>Syntax:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int main() {
    // statements
    return expression;
}`}
            </code>
          </pre>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Function Calls</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Syntax: <code className="bg-gray-700 px-1 rounded text-gray-100">functionName(expression1, expression2)</code>
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Arguments: Must provide exactly two expressions as arguments
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Usage: Can be used in expressions and assignments
            </li>
          </ul>
          <p style={{ lineHeight: "1.6" }}>Example:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int sum = addNumbers(10, 20);
int result = multiply(sum, 2);`}
            </code>
          </pre>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-plus-circle mr-2" style={{ color: "#706CEE" }}></i>
            Expressions and Operators
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Arithmetic Operators</h3>
          <p style={{ lineHeight: "1.6" }}>
            The language supports five basic arithmetic operators:
          </p>
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-500 p-2">Operator</th>
                <th className="border border-gray-500 p-2">Description</th>
                <th className="border border-gray-500 p-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-500 p-2 text-gray-100">+</td><td className="border border-gray-500 p-2 text-gray-100">Addition</td><td className="border border-gray-500 p-2 text-gray-100">a + b</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">-</td><td className="border border-gray-500 p-2 text-gray-100">Subtraction</td><td className="border border-gray-500 p-2 text-gray-100">a - b</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">*</td><td className="border border-gray-500 p-2 text-gray-100">Multiplication</td><td className="border border-gray-500 p-2 text-gray-100">a * b</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">/</td><td className="border border-gray-500 p-2 text-gray-100">Division</td><td className="border border-gray-500 p-2 text-gray-100">a / b</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">%</td><td className="border border-gray-500 p-2 text-gray-100">Modulo</td><td className="border border-gray-500 p-2 text-gray-100">a % b</td></tr>
            </tbody>
          </table>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Expression Types</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Simple operand: Variable or integer literal (e.g., x, 42, count)
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Binary operation: Two operands with an operator (e.g., x + 5, a * b, count % 2)
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Function call: Function invocation with two arguments (e.g., addNumbers(x, y), multiply(5, 10))
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-code-branch mr-2" style={{ color: "#706CEE" }}></i>
            Control Flow Statements
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Conditional Statements (if-else)</h3>
          <p style={{ lineHeight: "1.6" }}>If Statement:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`if (condition) {
    // statements executed if condition is true
}`}
            </code>
          </pre>
          <p style={{ lineHeight: "1.6" }}>If-Else Statement:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`if (condition) {
    // statements executed if condition is true
} else {
    // statements executed if condition is false
}`}
            </code>
          </pre>
          <p style={{ lineHeight: "1.6" }}>Example:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`if (x > 0) {
    result = x * 2;
} else {
    result = x * -1;
}`}
            </code>
          </pre>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Loops (while)</h3>
          <p style={{ lineHeight: "1.6" }}>Syntax:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`while (condition) {
    // statements repeated while condition is true
}`}
            </code>
          </pre>
          <p style={{ lineHeight: "1.6" }}>Example:</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`while (count < 10) {
    count = count + 1;
}`}
            </code>
          </pre>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-equals mr-2" style={{ color: "#706CEE" }}></i>
            Comparison Operators
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            Conditions are formed using comparison operators between two operands:
          </p>
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-500 p-2">Operator</th>
                <th className="border border-gray-500 p-2">Description</th>
                <th className="border border-gray-500 p-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-500 p-2 text-gray-100">&gt;</td><td className="border border-gray-500 p-2 text-gray-100">Greater than</td><td className="border border-gray-500 p-2 text-gray-100">x &gt; 5</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">&lt;</td><td className="border border-gray-500 p-2 text-gray-100">Less than</td><td className="border border-gray-500 p-2 text-gray-100">x &lt; 10</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">&gt;=</td><td className="border border-gray-500 p-2 text-gray-100">Greater than or equal</td><td className="border border-gray-500 p-2 text-gray-100">x &gt;= 0</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">&lt;=</td><td className="border border-gray-500 p-2 text-gray-100">Less than or equal</td><td className="border border-gray-500 p-2 text-gray-100">x &lt;= 100</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">==</td><td className="border border-gray-500 p-2 text-gray-100">Equal to</td><td className="border border-gray-500 p-2 text-gray-100">x == y</td></tr>
              <tr><td className="border border-gray-500 p-2 text-gray-100">!=</td><td className="border border-gray-500 p-2 text-gray-100">Not equal to</td><td className="border border-gray-500 p-2 text-gray-100">x != 0</td></tr>
            </tbody>
          </table>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Condition Examples</h3>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`if (score >= 0) {
    grade = 1;
}
while (counter != 0) {
    counter = counter - 1;
}`}
            </code>
          </pre>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-tag mr-2" style={{ color: "#706CEE" }}></i>
            Identifiers and Literals
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Identifiers</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Rules: Must start with a letter or underscore, followed by letters, digits, or underscores
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Valid examples: x, count, maxvalue, temp, result2
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Invalid examples: 2count, max-value, if
            </li>
          </ul>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Integer Literals</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Zero: 0
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Positive integers: 1, 42, 1000 (no leading zeros except for zero itself)
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              No negative literals: Use subtraction operator instead (0 - 5)
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-file-code mr-2" style={{ color: "#706CEE" }}></i>
            Complete Example Program
          </h2>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 overflow-x-auto">
            <code>
{`int globalCounter = 0;
int calculateSum(int start, int end) {
    int sum = 0;
    int current = start;
    while (current <= end) {
        sum = sum + current;
        current = current + 1;
    }
    return sum;
}
int main() {
    int result = calculateSum(1, 10);
    if (result > 50) {
        globalCounter = result;
    } else {
        globalCounter = 0;
    }
    return globalCounter;
}`}
            </code>
          </pre>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-list-alt mr-2" style={{ color: "#706CEE" }}></i>
            Grammar Rules Summary
          </h2>
          <h3 className="text-xl font-medium text-white mb-2">Key Constraints</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Every program must have a main function
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              All functions must return int and take exactly two int parameters (except main)
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Variables must be initialized when declared
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              All statements must end with semicolons
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Code blocks must be enclosed in curly braces
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Function calls require exactly two arguments
            </li>
          </ul>
          <h3 className="text-xl font-medium text-white mb-2 mt-4">Statement Types</h3>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Variable declaration: <code className="bg-gray-700 px-1 rounded text-gray-100">int name = value;</code>
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              Assignment: <code className="bg-gray-700 px-1 rounded text-gray-100">name = value;</code>
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              While loop:
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
                <code>
{`while (condition) {
    // statements
}`}
                </code>
              </pre>
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#706CEE" }}></i>
              If statement:
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
                <code>
{`if (condition) {
    // statements
} else {
    // statements
}`}
                </code>
              </pre>
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <p style={{ lineHeight: "1.6", fontStyle: "italic" }}>
            <i className="fas fa-quote-left mr-2" style={{ color: "#706CEE" }}></i>
            This C-like programming language is designed to be a simple yet powerful tool for learning and building programs, with a focus on clarity and essential functionality for developers.
          </p>
        </section>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default LanguageReference;