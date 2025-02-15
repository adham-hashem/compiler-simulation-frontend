import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../app/layout/Header";
import "../../features/css/style.css"
import "./LexicalAnalysis.css";

interface Token {
  type: string;
  lexeme: string;
  line: number;
  column: number;
}

const LexicalAnalysis: React.FC = () => {
  const location = useLocation();
  const [code, setCode] = useState<string>("");
  const [tokens, setTokens] = useState<Token[]>([
    { type: "INT_TYPE", lexeme: "int", line: 1, column: 0 },
    { type: "IDENTIFIER", lexeme: "z", line: 1, column: 4 },
    { type: "ASSIGN", lexeme: "=", line: 1, column: 6 },
    { type: "INT", lexeme: "2", line: 1, column: 8 },
    { type: "SEMI", lexeme: ";", line: 1, column: 9 }
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.code) {
      setCode(location.state.code);
      // analyzeCode(location.state.code);
    }
  }, [location]);

  // const analyzeCode = async (sourceCode: string) => {
  //   setLoading(true);
  //   setTokens([]);
  //   setErrors([]);

  //   try {
  //     const response = await fetch("/api/compilation/lexical-analysis", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ SourceCode: sourceCode }),
  //     });

  //     if (!response.ok) throw new Error("Failed to fetch tokens");

  //     const data = await response.json();
  //     setTokens(data.tokens);
  //     setErrors(data.errors || []);
  //   } catch (error) {
  //     console.error("Error analyzing code:", error);
  //     setErrors(["Failed to analyze the code."]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Header />
      <div className="container-fluid text-white" style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
        <h2 className="mb-3 text-white text-center">Lexical Analysis</h2>

        <div className="row">
          {/* Source Code Section */}
          <div className="col-md-7 mb-2">
            <h2 className="mb-3 text-white">Source Code</h2>
            <textarea
              className="form-control p-3 bg-dark text-white"
              rows={10}
              style={{ minHeight: "300px", fontFamily: "monospace" }}
              value={code}
              readOnly
            />
          </div>

          {/* Tokens Section */}
          <div className="col-md-5">
            <h2 className="mb-3 text-white">List of Tokens</h2>
            {loading ? (
              <p className="text-warning">Analyzing...</p>
            ) : (
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
                      <td colSpan={4} className="text-center text-warning">
                        No tokens found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Errors Section */}
        <div className="row mt-2">
          <div className="col-md-12">
            <h2 className="mb-3 text-white">Errors</h2>
            {errors.length > 0 ? (
              <ul className="list-group">
                {errors.map((error, index) => (
                  <li key={index} className="list-group-item list-group-item-danger">
                    {error}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="" style={{ color: "var(--main-color);" }}>No errors found</p>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="row mx-0 mt-3">
          <div className="col text-center">
            <Link 
            to="/source-code"
            className="btn btn-outline-light py-2 mx-4 mb-2 px-5"
            >
              Previous
            </Link>
            <Link
              to="/syntax-analysis"
              state={{ tokens }}
              className="btn py-2 mx-4 mb-2 px-5 nextButton"
              style={{ }}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LexicalAnalysis;
