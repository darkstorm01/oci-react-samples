import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FlowerList from "./FlowerList";
import FlowerForm from "./FlowerForm";
import FlowerEdit from "./FlowerEdit";
import Login from "./Login";       // ← Import the Login component
import "./App.css";

function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Login onLogin={() => setUnlocked(true)} />;
  }

  return (
    <Router>
      <div className="container">
        <nav>
          <h1>🌷 Fruit & Flower Co. 🫐</h1>
          <div className="nav-links">
            <Link to="/">All Flowers</Link>
            <Link to="/create">Create Flower</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<FlowerList />} />
          <Route path="/create" element={<FlowerForm />} />
          <Route path="/edit/:id" element={<FlowerEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;