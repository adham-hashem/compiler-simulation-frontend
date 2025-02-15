import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import AppProviderBasic from '../../features/home/HomePage';
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
};

export default App;
