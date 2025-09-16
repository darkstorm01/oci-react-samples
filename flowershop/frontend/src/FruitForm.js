import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FRUITS_API_URL } from "./api";

function FruitForm() {
  const navigate = useNavigate();
  const [fruit, setFruit] = useState({
    name: "",
    color: "",
    description: "",
    price: ""
  });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setFruit({ ...fruit, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!fruit.name) {
      setError("Name is required.");
      return;
    }
    if (!fruit.price) {
      setError("Price is required.");
      return;
    }
    fetch(FRUITS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fruit, price: parseFloat(fruit.price) })
    })
      .then(res => {
        if (res.ok) navigate("/fruits");
        else setError("Error creating fruit.");
      })
      .catch(() => setError("Network error."));
  };

  return (
    <div className="page">
      <h2>Create Fruit</h2>
      {error && <div className="error">{error}</div>}
      <form className="flower-form" onSubmit={handleSubmit}>
        <label>Name *</label>
        <input name="name" value={fruit.name} onChange={handleChange} required />
        <label>Color</label>
        <input name="color" value={fruit.color} onChange={handleChange} />
        <label>Description</label>
        <textarea name="description" value={fruit.description} onChange={handleChange} />
        <label>Price *</label>
        <input name="price" type="number" step="0.01" value={fruit.price} onChange={handleChange} required />
        <button className="button" type="submit">Create</button>
      </form>
    </div>
  );
}

export default FruitForm;