import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer />
<Router>
    <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    </Routes> 
   </Router>
   </>
  )
}

export default App