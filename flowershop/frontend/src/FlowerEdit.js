import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "./api";

function FlowerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setFlower(data))
      .catch(() => setFlower(null));
  }, [id]);

  const handleChange = e => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!flower.name) {
      setError("Name is required.");
      return;
    }
    // if (!flower.price) {
    //   setError("Price is required.");
    //   return;
    // }
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flower)
      // body: JSON.stringify({...flower, price: parseFloat(flower.price)})
    })
      .then(res => {
        if (res.ok) navigate("/");
        else setError("Error updating flower.");
      })
      .catch(() => setError("Network error."));
  };

  if (!flower) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <h2>Edit Flower</h2>
      {error && <div className="error">{error}</div>}
      <form className="flower-form" onSubmit={handleSubmit}>
        <label>Name *</label>
        <input name="name" value={flower.name || ""} onChange={handleChange} required />
        <label>Color</label>
        <input name="color" value={flower.color || ""} onChange={handleChange} />
        <label>Description</label>
        <textarea name="description" value={flower.description || ""} onChange={handleChange} />
        {/* <label>Price *</label> */}
        {/* <input name="price" type="number" step="0.01" value={fruit.price || ""} onChange={handleChange} required /> */}
        <button className="button" type="submit">Update</button>
      </form>
    </div>
  );
}

export default FlowerEdit;