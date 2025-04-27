import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import "./SyntaxAnalysis.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import Errors from "../errors/Errors";
import Notes from "../notes/Notes";
import { useCompilation } from "../context/CompilationContext";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import { API_BASE_URL } from '../../config';

// Define interfaces
interface ParseTreeNode {
  type: string;
  value?: string;
  children?: ParseTreeNode[];
}

interface D3TreeNode {
  type: string;
  value?: string;
  name: string;
  children?: D3TreeNode[];
}

interface Token {
  lexeme: string;
  type: string;
  line: number;
  column: number;
}

const SyntaxAnalysis: React.FC = () => {
  const { code, tokens, parseTree, setParseTree, setTokens } = useCompilation();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [notes] = useState<string[]>([
    "<program> ::= <statement_list>",
    "<statement_list> ::= <statement> | <statement> <statement_list>",
    "<statement> ::= <assignment> | <if_statement> | <while_statement>",
    "<assignment> ::= <identifier> = <expression> ;",
    "<if_statement> ::= if ( <expression> ) <statement> [ else <statement> ]",
    "<while_statement> ::= while ( <expression> ) <statement>",
    "<expression> ::= <term> | <term> + <expression> | <term> - <expression>",
    "<term> ::= <factor> | <factor> * <term> | <factor> / <term>",
    "<factor> ::= <identifier> | <number> | ( <expression> )",
    "<identifier> ::= <letter> | <letter> <alphanumeric>",
    "<number> ::= <digit> | <digit> <number>",
    "<letter> ::= a | b | c | ... | z | A | B | C | ... | Z",
    "<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
    "<alphanumeric> ::= <letter> | <digit> | <alphanumeric> <letter> | <alphanumeric> <digit>",
  ]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [tokensWidth, setTokensWidth] = useState(50);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const codeKey = useMemo(() => btoa(code || ""), [code]);

  useEffect(() => {
    const fetchLexicalAndSyntaxAnalysis = async () => {
      if (!code) {
        setTokens([]);
        setParseTree(null);
        setErrors(["No code provided"]);
        return;
      }

      setLoading(true);
      setErrors([]);

      if (parseTree && localStorage.getItem(`parseTree_${codeKey}`)) {
        console.log("Using existing parse tree from context");
        setLoading(false);
        return;
      }

      try {
        const lexicalResponse = await fetch(`${API_BASE_URL}/api/compilation/lexical-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ SourceCode: code }),
        });

        if (!lexicalResponse.ok) {
          throw new Error("Failed to fetch lexical analysis");
        }

        const lexicalData = await lexicalResponse.json();
        console.log("Lexical Analysis Data:", lexicalData);

        const lexicalErrors = lexicalData.errors || [];
        const fetchedTokens = lexicalData.tokens as Token[];

        if (lexicalErrors.length > 0) {
          setErrors(lexicalErrors);
          setTokens([]);
          console.log("Lexical errors found, aborting syntax analysis:", lexicalErrors);
          setLoading(false);
          return;
        }

        setTokens(fetchedTokens);
        console.log("Tokens Fetched:", fetchedTokens);

        const storageKey = `parseTree_${codeKey}`;
        const storedParseTree = localStorage.getItem(storageKey);

        if (storedParseTree) {
          console.log("Found stored parse tree in local storage:", storedParseTree);
          const parsedTree = JSON.parse(storedParseTree);
          if (parsedTree && typeof parsedTree === "object" && "type" in parsedTree) {
            setParseTree(parsedTree);
            console.log("Using cached parse tree from local storage");
            setLoading(false);
            return;
          }
        }

        const syntaxResponse = await fetch(`${API_BASE_URL}/api/compilation/syntax-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ SourceCode: code }),
        });

        if (!syntaxResponse.ok) {
          throw new Error("Failed to fetch parse tree");
        }

        const syntaxData = await syntaxResponse.json();
        const apiParseTree = syntaxData.parseTree as ParseTreeNode;
        setParseTree(apiParseTree);
        localStorage.setItem(storageKey, JSON.stringify(apiParseTree));
        setErrors(syntaxData.errors || []);
        console.log("Parse Tree Fetched and Stored:", apiParseTree);
      } catch (error) {
        console.error("Error during analysis:", error);
        setErrors([(error as Error).message || "Failed to perform analysis. Please check your input."]);
      } finally {
        setLoading(false);
      }
    };

    fetchLexicalAndSyntaxAnalysis();
  }, [code, codeKey, setParseTree, setTokens]);

  const downloadSVG = (format: "svg" | "jpeg") => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svgRef.current)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `parse_tree.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const transformToD3TreeNode = (node: ParseTreeNode): D3TreeNode => ({
    type: node.type,
    value: node.value,
    name: `${node.type}: ${node.value ?? ""}`.trim(),
    children: node.children ? node.children.map(transformToD3TreeNode) : undefined,
  });

  useEffect(() => {
    if (!svgRef.current || !parseTree) return;

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();
    svg.style("background", "black");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const d3TreeData = transformToD3TreeNode(parseTree);
    const treemap = d3.tree<D3TreeNode>().nodeSize([80, 80]);
    const nodes = d3.hierarchy<D3TreeNode>(d3TreeData, (d) => d.children);
    const tree = treemap(nodes);

    const descendants = tree.descendants();
    const minX = Math.min(...descendants.map((d) => d.x));
    const maxX = Math.max(...descendants.map((d) => d.x));
    const minY = Math.min(...descendants.map((d) => d.y));
    const maxY = Math.max(...descendants.map((d) => d.y));

    let treeWidth = maxX - minX + 100;
    const treeHeight = maxY - minY + 100;

    if (treeWidth < 800) {
      treeWidth += 800;
    }

    svg
      .attr("width", treeWidth + margin.left + margin.right)
      .attr("height", treeHeight + margin.top + margin.bottom)
      .attr("viewBox", `${minX - 50} ${minY - 50} ${treeWidth + 100} ${treeHeight + 100}`);

    g.selectAll(".link")
      .data(descendants.slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        const parentX = d.parent?.x ?? 0;
        const parentY = d.parent?.y ?? 0;
        return `M${d.x},${d.y} 
                C${d.x},${(d.y + parentY) / 2} 
                ${parentX},${(d.y + parentY) / 2} 
                ${parentX},${parentY}`;
      })
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    const node = g
      .selectAll(".node")
      .data(descendants)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", 12)
      .attr("fill", "#222")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    node
      .append("text")
      .attr("dy", ".35em")
      .attr("y", (d) => (d.children ? -20 : 20))
      .style("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "14px")
      .text((d) => d.data.name);
  }, [parseTree]);

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Drag started");

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const splitterWidthPercentage = (10 / containerRect.width) * 100;
      const newWidth = ((moveEvent.clientX - containerRect.left) / containerRect.width) * 100 - (splitterWidthPercentage / 2);
      console.log("Dragging - New Width:", newWidth);
      if (newWidth >= 20 && newWidth <= 80) {
        setTokensWidth(newWidth);
      }
    };

    const stopDragging = () => {
      console.log("Drag ended");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);
  };

  return (
    <>
      <Header />
      <div ref={containerRef} className="container-fluid text-white main-background-color syntax-container">
        <h2 className="mb-3 text-white text-center">Syntax Analysis</h2>

        <div className="split-container">
          <div className="tokens-section" style={{ width: `calc(${tokensWidth}% - 5px)` }}>
            <div className="p-3 rounded-div tokens-content">
              <h3 className="text-white">Tokens</h3>
              <div className="tokens-table-wrapper">
                <table className="table table-bordered tokens-table">
                  <thead>
                    <tr style={{ background: "#616161", color: "white" }}>
                      <th style={{ borderTopLeftRadius: "10px" }}>Lexeme</th>
                      <th>Type</th>
                      <th>Line</th>
                      <th style={{ borderTopRightRadius: "10px" }}>Column</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.length > 0 ? (
                      tokens.map((token, index) => (
                        <tr key={index}>
                          <td>{token.lexeme ?? "N/A"}</td>
                          <td>{token.type ?? "Unknown"}</td>
                          <td>{token.line ?? "-"}</td>
                          <td>{token.column ?? "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-warning">
                          No tokens found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `calc(${tokensWidth}% - 5px)` }}
          />

          <div className="tree-section" style={{ width: `calc(${100 - tokensWidth}% - 5px)` }}>
            <div className="p-3 rounded-div tree-content">
              <h3 className="text-white">Parse Tree</h3>
              {loading ? (
                <p className="text-warning">Fetching parse tree...</p>
              ) : parseTree ? (
                <div className="tree-wrapper">
                  <svg ref={svgRef}></svg>
                </div>
              ) : (
                <p className="text-warning">No parse tree available</p>
              )}
              <div className="text-center mt-2 download-button-wrapper">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => downloadSVG("svg")}
                  disabled={!parseTree}
                >
                  Download as SVG
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link
              to="/lexical-analysis"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Lexical Analysis)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/lexical-analysis';
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              to="/symbol-tables"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Symbol Tables)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/symbol-tables';
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

        <div className="errors-section">
          <Errors errors={errors} />
        </div>

        <Notes notes={notes} />

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default SyntaxAnalysis;