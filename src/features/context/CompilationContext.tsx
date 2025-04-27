import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

// Define Token interface
interface Token {
  type: string;
  lexeme: string;
  line: number;
  column: number;
}

// Define ParseTreeNode interface (used for parse tree and AST)
interface ParseTreeNode {
  type: string;
  value?: string;
  children?: ParseTreeNode[];
}

// Define Memory Execution Step interface
interface MemoryExecutionStep {
  stepNumber: number;
  stepName: string;
  memoryState: {
    dataSegment: string[];
    stack: { functionName: string; frameData: string[] }[];
  };
}

// Define Symbol Table interface
interface SymbolTable {
  scope: string;
  names: { [key: string]: string };
}

// Define the context type
interface CompilationContextType {
  code: string;
  setCode: (code: string) => void;
  updateCode: (newCode: string) => void;
  tokens: Token[];
  setTokens: React.Dispatch<React.SetStateAction<Token[]>>;
  parseTree: ParseTreeNode | null;
  setParseTree: React.Dispatch<React.SetStateAction<ParseTreeNode | null>>;
  abstractSyntaxTree: ParseTreeNode | null;
  setAbstractSyntaxTree: React.Dispatch<React.SetStateAction<ParseTreeNode | null>>;
  intermediateCode: string | null;
  setIntermediateCode: React.Dispatch<React.SetStateAction<string | null>>;
  optimizedIR: string | null;
  setOptimizedIR: React.Dispatch<React.SetStateAction<string | null>>;
  assemblyCode: string[] | null;
  setAssemblyCode: React.Dispatch<React.SetStateAction<string[] | null>>;
  registersAssemblyCode: string[] | null;
  setRegistersAssemblyCode: React.Dispatch<React.SetStateAction<string[] | null>>;
  scheduledAssemblyCode: string[] | null;
  setScheduledAssemblyCode: React.Dispatch<React.SetStateAction<string[] | null>>;
  memoryExecutionSteps: MemoryExecutionStep[] | null;
  setMemoryExecutionSteps: React.Dispatch<React.SetStateAction<MemoryExecutionStep[] | null>>;
  symbolTables: SymbolTable[] | null;
  setSymbolTables: React.Dispatch<React.SetStateAction<SymbolTable[] | null>>;
  optimizedCode: string | null; // New state for optimized source code
  setOptimizedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create Context with default values
const CompilationContext = createContext<CompilationContextType | undefined>(undefined);

// Context Provider Props
interface CompilationProviderProps {
  children: ReactNode;
}

export const CompilationProvider: React.FC<CompilationProviderProps> = ({ children }) => {
  const [code, setCode] = useState<string>(() => localStorage.getItem("code") ?? "");

  const [tokens, setTokens] = useState<Token[]>(() => {
    const storedTokens = localStorage.getItem("tokens");
    try {
      return storedTokens ? JSON.parse(storedTokens) : [];
    } catch (e) {
      console.error("Failed to parse tokens from localStorage:", e);
      return [];
    }
  });

  const [parseTree, setParseTree] = useState<ParseTreeNode | null>(() => {
    const storedParseTree = localStorage.getItem("parseTree");
    try {
      return storedParseTree ? JSON.parse(storedParseTree) : null;
    } catch (e) {
      console.error("Failed to parse parseTree from localStorage:", e);
      return null;
    }
  });

  const [abstractSyntaxTree, setAbstractSyntaxTree] = useState<ParseTreeNode | null>(() => {
    const storedAST = localStorage.getItem("abstractSyntaxTree");
    try {
      return storedAST ? JSON.parse(storedAST) : null;
    } catch (e) {
      console.error("Failed to parse abstractSyntaxTree from localStorage:", e);
      return null;
    }
  });

  const [intermediateCode, setIntermediateCode] = useState<string | null>(() => {
    const storedIR = localStorage.getItem("intermediateCode");
    return storedIR ?? null;
  });

  const [optimizedIR, setOptimizedIR] = useState<string | null>(() => {
    const storedOptimizedIR = localStorage.getItem("optimizedIR");
    return storedOptimizedIR ?? null;
  });

  const [assemblyCode, setAssemblyCode] = useState<string[] | null>(() => {
    const storedAssemblyCode = localStorage.getItem("assemblyCode");
    try {
      return storedAssemblyCode ? JSON.parse(storedAssemblyCode) : null;
    } catch (e) {
      console.error("Failed to parse assemblyCode from localStorage:", e);
      return null;
    }
  });

  const [registersAssemblyCode, setRegistersAssemblyCode] = useState<string[] | null>(() => {
    const storedRegistersAssemblyCode = localStorage.getItem("registersAssemblyCode");
    try {
      return storedRegistersAssemblyCode ? JSON.parse(storedRegistersAssemblyCode) : null;
    } catch (e) {
      console.error("Failed to parse registersAssemblyCode from localStorage:", e);
      return null;
    }
  });

  const [scheduledAssemblyCode, setScheduledAssemblyCode] = useState<string[] | null>(() => {
    const storedScheduledAssemblyCode = localStorage.getItem("scheduledAssemblyCode");
    try {
      return storedScheduledAssemblyCode ? JSON.parse(storedScheduledAssemblyCode) : null;
    } catch (e) {
      console.error("Failed to parse scheduledAssemblyCode from localStorage:", e);
      return null;
    }
  });

  const [memoryExecutionSteps, setMemoryExecutionSteps] = useState<MemoryExecutionStep[] | null>(() => {
    const storedMemorySteps = localStorage.getItem("memoryExecutionSteps");
    try {
      return storedMemorySteps ? JSON.parse(storedMemorySteps) : null;
    } catch (e) {
      console.error("Failed to parse memoryExecutionSteps from localStorage:", e);
      return null;
    }
  });

  const [symbolTables, setSymbolTables] = useState<SymbolTable[] | null>(() => {
    const storedSymbolTables = localStorage.getItem("symbolTables");
    try {
      return storedSymbolTables ? JSON.parse(storedSymbolTables) : null;
    } catch (e) {
      console.error("Failed to parse symbolTables from localStorage:", e);
      return null;
    }
  });

  const [optimizedCode, setOptimizedCode] = useState<string | null>(() => {
    const storedOptimizedCode = localStorage.getItem("optimizedCode");
    return storedOptimizedCode ?? null;
  });

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("code", code);
    localStorage.setItem("tokens", JSON.stringify(tokens));
    localStorage.setItem("parseTree", JSON.stringify(parseTree));
    localStorage.setItem("abstractSyntaxTree", JSON.stringify(abstractSyntaxTree));
    localStorage.setItem("intermediateCode", intermediateCode ?? "");
    localStorage.setItem("optimizedIR", optimizedIR ?? "");
    localStorage.setItem("assemblyCode", JSON.stringify(assemblyCode ?? []));
    localStorage.setItem("registersAssemblyCode", JSON.stringify(registersAssemblyCode ?? []));
    localStorage.setItem("scheduledAssemblyCode", JSON.stringify(scheduledAssemblyCode ?? []));
    localStorage.setItem("memoryExecutionSteps", JSON.stringify(memoryExecutionSteps ?? []));
    localStorage.setItem("symbolTables", JSON.stringify(symbolTables ?? []));
    localStorage.setItem("optimizedCode", optimizedCode ?? "");
  }, [
    code,
    tokens,
    parseTree,
    abstractSyntaxTree,
    intermediateCode,
    optimizedIR,
    assemblyCode,
    registersAssemblyCode,
    scheduledAssemblyCode,
    memoryExecutionSteps,
    symbolTables,
    optimizedCode,
  ]);

  // Function to update code and reset dependent states
  const updateCode = (newCode: string) => {
    if (newCode !== code) {
      setCode(newCode);
      setTokens([]);
      setParseTree(null);
      setAbstractSyntaxTree(null);
      setIntermediateCode(null);
      setOptimizedIR(null);
      setAssemblyCode(null);
      setRegistersAssemblyCode(null);
      setScheduledAssemblyCode(null);
      setMemoryExecutionSteps(null);
      setSymbolTables(null);
      setOptimizedCode(null); // Reset optimizedCode when code changes
    }
  };

  return (
    <CompilationContext.Provider
      value={{
        code,
        setCode,
        updateCode,
        tokens,
        setTokens,
        parseTree,
        setParseTree,
        abstractSyntaxTree,
        setAbstractSyntaxTree,
        intermediateCode,
        setIntermediateCode,
        optimizedIR,
        setOptimizedIR,
        assemblyCode,
        setAssemblyCode,
        registersAssemblyCode,
        setRegistersAssemblyCode,
        scheduledAssemblyCode,
        setScheduledAssemblyCode,
        memoryExecutionSteps,
        setMemoryExecutionSteps,
        symbolTables,
        setSymbolTables,
        optimizedCode,
        setOptimizedCode,
      }}
    >
      {children}
    </CompilationContext.Provider>
  );
};

// Custom Hook for accessing context
export const useCompilation = (): CompilationContextType => {
  const context = useContext(CompilationContext);
  if (!context) {
    throw new Error("useCompilation must be used within a CompilationProvider");
  }
  return context;
};