import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Link } from "react-router-dom";
import "../../features/css/style.css";
import "./SemanticAnalysis.css";
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

const SemanticAnalysis: React.FC = () => {
  const { code, tokens, parseTree, setParseTree, abstractSyntaxTree, setAbstractSyntaxTree } = useCompilation();
  const parseTreeSvgRef = useRef<SVGSVGElement | null>(null);
  const abstractSyntaxTreeSvgRef = useRef<SVGSVGElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [parseTreeWidth, setParseTreeWidth] = useState(50); // Default 50% width
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

  useEffect(() => {
    const fetchAbstractSyntaxTree = async () => {
      if (!parseTree || abstractSyntaxTree) return;
      setLoading(true);
      setErrors([]);
      setNotes([]);

      try {
        const requestBody = { ParseTree: parseTree };
        console.log("Sending request to semantic-analysis API:", requestBody);

        const response = await fetch(`${API_BASE_URL}/api/compilation/semantic-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch abstract syntax tree: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const apiAST = data.ast as ParseTreeNode;
        setAbstractSyntaxTree(apiAST);
        setErrors(data.errors || []);
        console.log("Abstract Syntax Tree Fetched:", apiAST);
      } catch (error) {
        console.error("Error fetching abstract syntax tree:", error);
        setErrors([(error as Error).message || "Failed to fetch abstract syntax tree. Please try again."]);
      } finally {
        setLoading(false);
      }
    };

    fetchAbstractSyntaxTree();
  }, [parseTree, abstractSyntaxTree, setAbstractSyntaxTree]);

  const transformToD3TreeNode = (node: ParseTreeNode): D3TreeNode => ({
    type: node.type,
    value: node.value,
    name: `${node.type}: ${node.value ?? ""}`.trim(),
    children: node.children ? node.children.map(transformToD3TreeNode) : undefined,
  });

  const renderTree = (svgRef: React.RefObject<SVGSVGElement>, treeData: ParseTreeNode | null) => {
    if (!svgRef.current || !treeData) return;

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current).style("background", "black");
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const d3TreeData = transformToD3TreeNode(treeData);
    const treemap = d3.tree<D3TreeNode>().nodeSize([80, 80]);
    const nodes = d3.hierarchy<D3TreeNode>(d3TreeData, (d) => d.children);
    const tree = treemap(nodes);

    const minX = Math.min(...tree.descendants().map((d) => d.x));
    const maxX = Math.max(...tree.descendants().map((d) => d.x));
    const minY = Math.min(...tree.descendants().map((d) => d.y));
    const maxY = Math.max(...tree.descendants().map((d) => d.y));

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
      .data(tree.descendants().slice(1))
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
      .data(tree.descendants())
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
  };

  const downloadSVG = (svgRef: React.RefObject<SVGSVGElement>, filename: string) => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svgRef.current)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    renderTree(parseTreeSvgRef, parseTree);
  }, [parseTree]);

  useEffect(() => {
    renderTree(abstractSyntaxTreeSvgRef, abstractSyntaxTree);
  }, [abstractSyntaxTree]);

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
        setParseTreeWidth(newWidth);
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
      <div ref={containerRef} className="container-fluid text-white main-background-color semantic-container">
        <h2 className="mb-3 text-white text-center">Semantic Analysis</h2>

        <div className="split-container">
          {/* Parse Tree Section */}
          <div className="parse-tree-section" style={{ width: `calc(${parseTreeWidth}% - 5px)` }}>
            <div className="p-3 rounded-div parse-tree-content">
              <h3 className="text-white">Parse Tree</h3>
              {parseTree ? (
                <div className="tree-wrapper">
                  <svg ref={parseTreeSvgRef}></svg>
                </div>
              ) : (
                <p className="text-warning">No parse tree available</p>
              )}
              <div className="text-center mt-2 download-button-wrapper">
                <button
                  onClick={() => downloadSVG(parseTreeSvgRef, "parse_tree.svg")}
                  className="btn btn-sm btn-outline-light"
                  disabled={!parseTree}
                >
                  Download SVG
                </button>
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div
            ref={dragRef}
            onMouseDown={startDragging}
            className="drag-handle"
            style={{ left: `calc(${parseTreeWidth}% - 5px)` }}
          />

          {/* Abstract Syntax Tree Section */}
          <div className="ast-section" style={{ width: `calc(${100 - parseTreeWidth}% - 5px)` }}>
            <div className="p-3 rounded-div ast-content">
              <h3 className="text-white">Abstract Syntax Tree</h3>
              {loading ? (
                <p className="text-warning">Fetching abstract syntax tree...</p>
              ) : abstractSyntaxTree ? (
                <div className="tree-wrapper">
                  <svg ref={abstractSyntaxTreeSvgRef}></svg>
                </div>
              ) : (
                <p className="text-warning">No abstract syntax tree available</p>
              )}
              <div className="text-center mt-2 download-button-wrapper">
                <button
                  onClick={() => downloadSVG(abstractSyntaxTreeSvgRef, "abstract_syntax_tree.svg")}
                  className="btn btn-sm btn-outline-light"
                  disabled={!abstractSyntaxTree}
                >
                  Download SVG
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="row mx-0 mt-3 d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <Link
              to="/symbol-tables"
              className="btn arrow-button prev-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Previous Page (Symbol Tables)"
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              to="/intermediate-code-generation"
              className="btn arrow-button next-arrow mx-4 mb-2"
              role="button"
              aria-label="Navigate to Next Page (Intermediate Code Generation)"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/intermediate-code-generation';
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

export default SemanticAnalysis;