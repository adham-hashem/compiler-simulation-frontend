// src/app/layout/App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CompilationProvider } from '../../features/context/CompilationContext';
import { ThemeProvider } from '../../features/context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CompilationProvider>
        <Outlet />
      </CompilationProvider>
    </ThemeProvider>
  );
};

export default App;