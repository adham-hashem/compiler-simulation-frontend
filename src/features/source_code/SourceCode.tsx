import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/bootstrap.min.css";
import "./SourceCode.css";
import Header from "../../app/layout/Header";

const SourceCode: React.FC = () => {
  const [code, setCode] = useState(
    `int z = 2; int add(int a, int b){return a + b;} int main(){int x = 2; if(z > 2){int y = add(3, 3); int z = 2; int res = y + z; if(res > 2) {int sd = 2;}} return x;}`
  );
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    
    try {
      const response = await fetch("/api/v1/ocr/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      setCode(data.ExtractedCode); // Assuming API returns { extractedCode: "code from image" }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Header />
        <div className="container-fluid min-vh-100 text-white" style={{ backgroundColor: "black", minHeight: "100vh", width: "100vw", padding: "20px" }}>
        <div className="row">
            {/* Code Input Section */}
            <div className="col-md-7 mb-2">
            <h2 className="mb-3 text-white">Source Code Input</h2>
            <textarea
                className="form-control p-3 bg-dark rounded text-white"
                rows={15}
                style={{ minHeight: "300px" }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            
            {/* File Upload Button */}
            <div className="mt-3 text-center">
                <label className="btn btn-outline-light p-3 mx-4 mb-2 px-5">
                Upload Image
                <input type="file" accept="image/*" className="d-none" onChange={handleFileUpload} />
                </label>
                {loading && <span className="ml-2 ms-2" style={{ color: "#FF0037" }}>Processing...</span>}
            </div>
            </div>

            {/* Grammar Section */}
            <div className="col-md-5 mb-2">
            <h2 className="mb-3 text-white">Grammar</h2>
            <div className="border p-3 bg-dark rounded">
                <pre className="text-white">
                {`class MyThread:
        def __init__(self, target, args=()):
            self.target = target
            self.args = args

        def start(self):
            thread = _Thread(target=self.target, args=self.args)
            thread.start()`}
                </pre>
            </div>
            </div>
        </div>

        {/* Buttons Section */}
        <div className="row mx-0 mt-3">
            <div className="col text-center">
            <Link to="/optimize-code" className="btn btn-outline-light py-3 mx-2 mb-2 px-5 btn1">
                Optimize Code
            </Link>
            <Link
            to="/lexical-analysis"
            state={{ code }}
            className="btn btn-outline-light py-3 mx-1 mb-2 px-5 btn2"
            >
            Simulate Code
            </Link>

            <Link to="/simulate-memory" className="btn btn-outline-light py-3 mx-2 mb-2 px-5 btn3">
                Simulate Memory
            </Link>
            </div>
        </div>
        </div>
    </>
  );
};

export default SourceCode;
