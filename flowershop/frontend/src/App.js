import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import FlowerList from "./FlowerList";
import FlowerForm from "./FlowerForm";
import FlowerEdit from "./FlowerEdit";
import Login from "./Login";
import "./App.css";

// Uncomment these lines to enable full Fruits CRUD
// import FruitList from "./FruitList";
// import FruitForm from "./FruitForm";
// import FruitEdit from "./FruitEdit";


function Tabs() {
  const location = useLocation();
  return (
    <nav className="tabs">
      <Link
        className={location.pathname.startsWith("/fruits") ? "tab" : "tab tab-active"}
        to="/"
      >
        Flowers
      </Link>
      <Link
        className={location.pathname.startsWith("/fruits") ? "tab tab-active" : "tab"}
        to="/fruits"
      >
        Fruits
      </Link>
    </nav>
  );
}

function FruitsPlaceholder() {
  return (
    <div className="centered">
      <h2>Fruits Module</h2>
      <p>🚧 Yet to be implemented. 🚧</p>
    </div>
  );
}

function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Login onLogin={() => setUnlocked(true)} />;
  }
  return (
    <Router>
      <div className="container">
        <h1>🌷 Fruit & Flower Co. 🫐</h1>
        <Tabs />
        <Routes>
          {/* Flowers CRUD */}
          <Route path="/" element={<FlowerList />} />
          <Route path="/create" element={<FlowerForm />} />
          <Route path="/edit/:id" element={<FlowerEdit />} />
          {/* Fruits Placeholder */}
          <Route path="/fruits" element={<FruitsPlaceholder />} />

          {/*
          <Route path="/fruits" element={<FruitList />} />
          <Route path="/fruits/create" element={<FruitForm />} />
          <Route path="/fruits/edit/:id" element={<FruitEdit />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;