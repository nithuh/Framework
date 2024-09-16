import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./page/register";
import Login from "./page/Login";
import PTCode from "./page/ptcode";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Login Route */}
        <Route path="/register" element={<Register />} /> {/* Register Route */}
        <Route path="/" element={<Login />} /> {/* Default Route */}
        <Route path="/ptcode" element={<PTCode />} /> {/* PTCode Route */}
      </Routes>
    </Router>
  );
};

export default App;







