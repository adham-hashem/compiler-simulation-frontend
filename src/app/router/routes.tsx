import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import SourceCode from "../../features/source_code/SourceCode";
import LexicalAnalysis from "../../features/lexical_analysis/LexicalAnaysis";
import SyntaxAnalysis from "../../features/syntax_analysis/SyntaxAnalysis";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'source-code', element: <SourceCode /> },
            { path: 'lexical-analysis', element: <LexicalAnalysis /> },
            { path: 'syntax-analysis', element: <SyntaxAnalysis /> },

            // { path: '/subjects/:id/notes', element: <SubjectNotes /> },
        ]
    }
])