import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ApiDemo from './pages/ApiDemo';
import { ThemeProvider } from './context/ThemeContext';
;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-demo" element={<ApiDemo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
