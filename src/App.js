import React from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Project from './Components/Project';
import NewForm from './Components/NewForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // Initialize user name state

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Signup  />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login  />} />
          <Route path='/project' element={<Project/>} />
          <Route path='/newform' element={<NewForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
