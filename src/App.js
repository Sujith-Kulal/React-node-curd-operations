
import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<EmployeeTable />} />
            </Routes>
            
    </div>
    </Router>
  );
}

export default App;
