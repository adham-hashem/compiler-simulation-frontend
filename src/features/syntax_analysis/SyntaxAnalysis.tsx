import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../app/layout/Header";
import "../css/style.css";

// Define interfaces
interface Token {
  type: string;
  lexeme: string;
  line: number;
  column: number;
}

interface TreeNode {
  type: string;
  value: string;
  children: TreeNode[];
}

const SyntaxAnalysis: React.FC = () => {
  const location = useLocation();
  const [tokens, setTokens] = useState<Token[]>(location.state?.tokens || []);
  const [parseTree, setParseTree] = useState<TreeNode | null>(
    location.state?.parseTree || {
      "type": "Program",
      "value": "intx=10;inty=20;intadd(inta,intb){intsum=a+b;returnsum;}intmain(){intz=add(x,y);if(z>20){x=x+1;}else{y=y-1;}while(x<15){x=x+1;}returnz;}<EOF>",
      "children": [
        {
          "type": "VariableDeclaration",
          "value": "intx=10;",
          "children": [
            { "type": "Terminal", "value": "int", "children": [] },
            { "type": "Terminal", "value": "x", "children": [] },
            { "type": "Terminal", "value": "=", "children": [] },
            {
              "type": "Expression",
              "value": "10",
              "children": [
                {
                  "type": "Operand",
                  "value": "10",
                  "children": [{ "type": "Terminal", "value": "10", "children": [] }]
                }
              ]
            },
            { "type": "Terminal", "value": ";", "children": [] }
          ]
        },
        {
          "type": "VariableDeclaration",
          "value": "inty=20;",
          "children": [
            { "type": "Terminal", "value": "int", "children": [] },
            { "type": "Terminal", "value": "y", "children": [] },
            { "type": "Terminal", "value": "=", "children": [] },
            {
              "type": "Expression",
              "value": "20",
              "children": [
                {
                  "type": "Operand",
                  "value": "20",
                  "children": [{ "type": "Terminal", "value": "20", "children": [] }]
                }
              ]
            },
            { "type": "Terminal", "value": ";", "children": [] }
          ]
        }
      ]
    }
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Extract source code from tokens
  const sourceCode = location.state?.sourceCode || "";

  useEffect(() => {
    if (!sourceCode) return;
    
    setLoading(true);
    fetch("/api/compilation/syntax-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SourceCode: sourceCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        setParseTree(data.parseTree);
        setErrors(data.errors);
      })
      .catch(() => setErrors(["Failed to fetch parse tree."]))
      .finally(() => setLoading(false));
  }, [sourceCode]);

  // Recursive function to render the parse tree
  const renderTree = (node: TreeNode) => {
    return (
      <ul key={node.value} className="tree-node">
        <li>
          <strong>{node.type}:</strong> {node.value}
          {node.children.length > 0 && (
            <ul>
              {node.children.map((child) => renderTree(child))}
            </ul>
          )}
        </li>
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div className="container-fluid text-white" style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
        <h2 className="mb-3 text-white text-center">Syntax Analysis</h2>

        <div className="row">
          {/* Tokens Section */}
          <div className="col-md-6">
            <h2 className="mb-3 text-white">Tokens</h2>
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>Lexeme</th>
                  <th>Type</th>
                  <th>Line</th>
                  <th>Column</th>
                </tr>
              </thead>
              <tbody>
                {tokens.length > 0 ? (
                  tokens.map((token, index) => (
                    <tr key={index}>
                      <td>{token.lexeme}</td>
                      <td>{token.type}</td>
                      <td>{token.line}</td>
                      <td>{token.column}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-warning">No tokens found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SyntaxAnalysis;
