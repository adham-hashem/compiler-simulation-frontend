import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { CompilationProvider } from '../../features/context/CompilationContext';

const App: React.FC = () => {
  return (
    <>
      <CompilationProvider>
        <Outlet />
      </CompilationProvider>
    </>
  );
};

export default App;
