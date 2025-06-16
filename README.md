# 🧠 HAMSY Compiler

**HAMSY Compiler** is an **AI-powered code optimization and compilation simulation tool** that improves C++ source code performance while simulating the internal stages of a compiler such as **lexical analysis**, **syntax parsing**, **AST/IR generation**, and **memory visualization**.

---

## ✨ Key Features

### 🤖 AI Optimization
- Enhances a source code for performance and memory efficiency
- Learns from datasets of unoptimized vs optimized code
- Custom-built AI models (no third-party APIs used)

### 🧩 Compilation Stage Simulation
- **Lexical Analysis**: Token generation and symbol table creation
- **Syntax Analysis**: Parse tree and parse table generation
- **Semantic Analysis**: AST generation and type checking
- **IR Generation**: Intermediate Representation generation
- **Code Generation**: Assembly instruction selection, scheduling, and register allocation

### 🧠 Memory Visualization
- Simulates memory structure during compilation
- Displays variables, stack, heap, and memory allocation changes

### 🖼️ OCR Module
- Converts code from images to editable text
- Trained custom neural network for OCR

### 🛠️ Cross-Platform System
- **Backend**: ASP.NET Core Web API  
- **Frontend**: React.js  
- **Architecture**: Clean architecture with services, repositories, DTOs, and security layers

---

## 🧱 System Modules

| Module | Description |
|--------|-------------|
| `img-to-code` | Extracts code from images using OCR |
| `lexical-analysis` | Tokenizes source code and builds symbol table |
| `syntax-analysis` | Generates parse trees and parse tables |
| `semantics-analysis` | Builds AST and performs type checking |
| `ir-generation` | Translates AST into intermediate representation |
| `optimization` | Optimizes IR for speed and memory |
| `instruction-selection` | Maps IR to assembly instructions |
| `instruction-scheduling` | Orders instructions for performance |
| `registers-allocation` | Allocates CPU registers efficiently |
| `analyze-memory` | Simulates memory usage of code |

---

## 📦 Installation

1. **Clone the repository**  
```bash
npm install
```

2. **Run the frontend**
```
npm start
```

---

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🤝 Contributors
Made with 💻 and 🚀 by Adham Hashem and the HAMSY Team.

---

## 📧 Contact
For questions, feedback, or collaboration, contact me at:
📬 adhamhashem2025@gmail.com