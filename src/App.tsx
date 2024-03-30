import React from 'react';
import './App.css';
import { Routes,Route,Link, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { OperationsPage } from './pages/OperationsPage';
import { OperationPage } from './pages/OperationPage';
import { ProfilePage } from './pages/ProfilePage';
import { Navigation } from './navigation/Navigation';
function App() {



  return (
    <>
      <Navigation/>
    </>
  );
}

export default App;
