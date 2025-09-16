import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "./api";

function FlowerList() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setFlowers(data))
      .catch(() => setFlowers([]))
      .finally(() => setLoading(false));
  };

  const deleteFlower = (id) => {
    if (!window.confirm("Are you sure you want to delete this flower?")) return;
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          setMessage("Flower deleted.");
          fetchFlowers();
        }
      })
      .catch(() => setMessage("Delete failed."));
  };

  return (
    <div className="page">
      <h2>All Flowers</h2>
      {message && <div className="message">{message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : flowers.length === 0 ? (
        <div>No flowers found.</div>
      ) : (
        <table className="flower-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Color</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flowers.map(flower => (
              <tr key={flower.id}>
                <td>{flower.id}</td>
                <td>{flower.name}</td>
                <td>{flower.color}</td>
                <td>{flower.description}</td>
                <td>
                  <Link className="button edit" to={`/edit/${flower.id}`}>Edit</Link>
                  <button className="button delete" onClick={() => deleteFlower(flower.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FlowerList;