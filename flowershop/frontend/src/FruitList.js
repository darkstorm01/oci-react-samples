import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FRUITS_API_URL } from "./api";

function FruitList() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = () => {
    setLoading(true);
    fetch(FRUITS_API_URL)
      .then(res => res.json())
      .then(data => setFruits(data))
      .catch(() => setFruits([]))
      .finally(() => setLoading(false));
  };

  const deleteFruit = (id) => {
    if (!window.confirm("Are you sure you want to delete this fruit?")) return;
    fetch(`${FRUITS_API_URL}/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          setMessage("Fruit deleted.");
          fetchFruits();
        }
      })
      .catch(() => setMessage("Delete failed."));
  };

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>All Fruits</h2>
        <button className="button" onClick={() => navigate("/fruits/create")}>Add Fruit</button>
      </div>
      {message && <div className="message">{message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : fruits.length === 0 ? (
        <div>No fruits found.</div>
      ) : (
        <table className="flower-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Color</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map(fruit => (
              <tr key={fruit.id}>
                <td>{fruit.id}</td>
                <td>{fruit.name}</td>
                <td>{fruit.color}</td>
                <td>{fruit.description}</td>
                <td>{fruit.price}</td>
                <td>
                  <Link className="button edit" to={`/fruits/edit/${fruit.id}`}>Edit</Link>
                  <button className="button delete" onClick={() => deleteFruit(fruit.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FruitList;