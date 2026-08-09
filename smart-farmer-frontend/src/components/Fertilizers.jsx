import { useState } from "react";
import API from "../api";

function Fertilizers({
  fertilizers,
  showFertilizers,
  setShowFertilizers,
  search,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [usage, setUsage] = useState("");
  const [quantity, setQuantity] = useState("");

  const addFertilizer = async () => {
    if (!name || !description || !usage || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/fertilizers/", {
        name: name,
        description: description,
        usage: usage,
        quantity: quantity,
      });

      alert("Fertilizer added successfully");

      setName("");
      setDescription("");
      setUsage("");
      setQuantity("");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add fertilizer");
    }
  };

  const deleteFertilizer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fertilizer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/fertilizers/${id}`);

      alert("Fertilizer deleted successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete fertilizer");
    }
  };

  return (
    <div className="card">
      <h2>🧪 Fertilizers</h2>

      <h3>Add New Fertilizer</h3>

      <input
        type="text"
        placeholder="Fertilizer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Usage"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
      />

      <input
        type="text"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={addFertilizer}>
        Add Fertilizer
      </button>

      <hr />

      <button onClick={() => setShowFertilizers(!showFertilizers)}>
        {showFertilizers ? "Hide Fertilizers" : "View Fertilizers"}
      </button>

      <p>Total Fertilizers: {fertilizers.length}</p>

      {showFertilizers &&
        fertilizers
          .filter((fertilizer) =>
            fertilizer.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((fertilizer) => (
            <div key={fertilizer.id}>
              <h3>{fertilizer.name}</h3>

              <p>Description: {fertilizer.description}</p>

              <p>Usage: {fertilizer.usage}</p>

              <p>Quantity: {fertilizer.quantity}</p>

              <button
                onClick={() => deleteFertilizer(fertilizer.id)}
              >
                🗑️ Delete
              </button>

              <hr />
            </div>
          ))}
    </div>
  );
}

export default Fertilizers;