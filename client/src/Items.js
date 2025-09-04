import React, { useState, useEffect } from "react";
import axios from "axios";

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch items from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add item
  const addItem = () => {
    if (!name || !description) return; // don’t allow empty inputs
    axios.post("http://localhost:5000/api/items", { name, description })
      .then(res => {
        setItems([...items, res.data]);
        setName("");
        setDescription("");
      })
      .catch(err => console.error(err));
  };

  // Delete item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN Items App</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
