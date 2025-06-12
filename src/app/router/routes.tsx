import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import MemoryVisualization from "../../features/memory_visualization/MemoryVisualization";
import SourceCode from "../../features/source_code/SourceCode";
import LexicalAnalysis from "../../features/lexical_analysis/LexicalAnaysis";
import SyntaxAnalysis from "../../features/syntax_analysis/SyntaxAnalysis";
import SemanticAnalysis from "../../features/semantic_analysis/SemanticAnalysis";
import IntermediateCodeGeneration from "../../features/ir_generation/IntermediateCodeGeneration";
import InsturctionSelection from "../../features/instruction_selection/InstructionSelection";
import RegisterAllocation from "../../features/register_allocation/RegisterAllocation";
import InstructionSceduling from "../../features/instrction_scheduling/InstructionScheduling";
import IntermediateCodeOptimization from "../../features/ir-optimization/IntermediateCodeOptimization";
import SymbolTables from "../../features/symbol_table/SymbolTables";
import Services from "../../features/services/Services";
import CodeOptimization from "../../features/code-optimization/CodeOptimization";
import CompilerInfo from "../../features/compiler_info/CompilerInfo";
import MemoryGraphicalVisualization from "../../features/visualization/memory_graphical_visualization/MemoryGraphicalVisualization";
// import LexicalAnalysisVisualization from "../../features/visualization/lexical_analysis_visualization/LexicalAnalysisVisualization";
// import ParseTreeVisualization from "../../features/visualization/parse_tree_visualization/ParseTreeVisualization";
// import AbstractSyntaxTreeVisualization from "../../features/visualization/abstract_syntax_tree_visualization/AbstractSyntaxTreeVisualization";
// import IntermediateRepresentationVisualization from "../../features/visualization/intermediate_representation_visualization/IntermediateRepresentationVisualization";
// import InstructionSelectionVisualization from "../../features/visualization/instruction_selection_visualization/InstructionSelectionVisualization";
// import InstructionSchedulingVisualization from "../../features/visualization/instruction_scheduling_visualization/InstructionSchedulingVisualization";
// import RegistersVisualization from "../../features/visualization/registers_visualization/RegistersVisualization";
import VisualizationPage from "../../features/visualization/visualization_page/VisualizationPage";
// import VisualizationOverview from "../../features/visualization/visualization_overview/VisualizationOverview";
import CompilationStagesPage from "../../features/visualization/compilation_stages_page/CompilationStagesPage";
import MemoryPage from "../../features/visualization/memory_page/MemoryPage";
import WhyHamsy from "../../features/why_hamsy/WhyHamsy";
import CompilerWorking from "../../features/explainations/compiler_working/CompilerWorking";
import LexicalAnalysisExplaination from "../../features/explainations/lexical_analysis_explaination/LexicalAnalysisExplaination";
import SyntaxAnalysisExplaination from "../../features/explainations/Syntax_analysis_explaination/SyntaxAnalysisExplaination";
import SemanticAnalysisExplaination from "../../features/explainations/semantic_analysis_explaination/SemanticAnalysisExplaination";
import IntermediateCodeGenerationExplaination from "../../features/explainations/intermediate_code_generation/IntermediateCodeGenerationExplaination";
import IntermediateCodeOptimizationExplaination from "../../features/explainations/intermediate_code_optimization_explaination/IntermediateCodeOptimizationExplaination";
import InstructionSelectionExplaination from "../../features/explainations/instruction_selection_explaination/InstructionSelectionExplaination";
import RegisterAllocationExplaination from "../../features/explainations/register_allocation_explaination/RegisterAllocationExplaination";
import RegisterSchedulingExplaination from "../../features/explainations/register_scheduling_explaination/RegisterSchedulingExplaination";
import MemoryAnalysisExplaination from "../../features/explainations/memory_analysis_explaination/MemoryAnalysisExplaination";
import AICodeOptimizationExplaination from "../../features/explainations/AI_code_optimization_explaination/AICodeOptimizationExplaination";
import SymbolTablesExplaination from "../../features/explainations/symbol_tables_explaination/SymbolTablesExplaination";
import Explore from "../../features/explainations/explore/Explore";
import OCRExplaination from "../../features/explainations/ocr_explaination/OCRExplaination";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage />},
            { path: 'services', element: <Services />},
            { path: 'why-hamsy', element: <WhyHamsy /> },
            { path: 'what-is-compiler', element: <CompilerInfo />},
            { path: 'explore', element: <Explore />},
            { path: 'compiler-working-explaination', element: <CompilerWorking />},
            { path: 'lexical-analysis-explaination', element: <LexicalAnalysisExplaination />},
            { path: 'syntax-analysis-explaination', element: <SyntaxAnalysisExplaination />},
            { path: 'symbol-tables-explaination', element: <SymbolTablesExplaination />},
            { path: 'semantic-analysis-explaination', element: <SemanticAnalysisExplaination />},
            { path: 'intermediate-code-generation-explaination', element: <IntermediateCodeGenerationExplaination />},
            { path: 'intermediate-code-optimization-explaination', element: <IntermediateCodeOptimizationExplaination />},
            { path: 'instruction-selection-explaination', element: <InstructionSelectionExplaination />},
            { path: 'register-allocation-explaination', element: <RegisterAllocationExplaination />},
            { path: 'register-scheduling-explaination', element: <RegisterSchedulingExplaination />},
            { path: 'memory-analysis-explaination', element: <MemoryAnalysisExplaination />},
            { path: 'ai-code-optimization-explaination', element: <AICodeOptimizationExplaination />},
            { path: 'ocr-explaination', element: <OCRExplaination />},
            { path: 'source-code', element: <SourceCode /> },
            { path: 'memory-visualization', element: <MemoryVisualization/> },
            { path: 'code-optimization', element: <CodeOptimization/> },
            { path: 'lexical-analysis', element: <LexicalAnalysis /> },
            { path: 'symbol-tables', element: <SymbolTables /> },
            { path: 'syntax-analysis', element: <SyntaxAnalysis /> },
            { path: 'semantic-analysis', element: <SemanticAnalysis /> },
            { path: 'intermediate-code-generation', element: <IntermediateCodeGeneration /> },
            { path: 'intermediate-code-optimization', element: <IntermediateCodeOptimization /> },
            { path: 'instruction-selection', element: <InsturctionSelection /> },
            { path: 'register-allocation', element: <RegisterAllocation /> },
            { path: 'instruction-scheduling', element: <InstructionSceduling /> },
            { path: 'visualization', element: <VisualizationPage /> },
            // { path: 'visualization-overview', element: <VisualizationOverview /> },
            { path: 'memory-graphical-visualization', element: <MemoryGraphicalVisualization />},
            // { path: 'lexical-analysis-visualization', element: <LexicalAnalysisVisualization />},
            // { path: 'parse-tree-visualization', element: <ParseTreeVisualization />},
            // { path: 'abstract-syntax-visualization', element: <AbstractSyntaxTreeVisualization />},
            // { path: 'intermediate-representation-visualization', element: <IntermediateRepresentationVisualization />},
            // { path: 'instruction-selection-visualization', element: <InstructionSelectionVisualization />},
            // { path: 'instruction-scheduling-visualization', element: <InstructionSchedulingVisualization />},
            // { path: 'registers-visualization', element: <RegistersVisualization />},
            { path: 'compilation-stages', element: <CompilationStagesPage />},
            { path: 'memory-details', element: <MemoryPage />}

            // { path: '/subjects/:id/notes', element: <SubjectNotes /> },
        ]
    }
])