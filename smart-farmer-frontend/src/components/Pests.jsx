import { useState } from "react";
import API from "../api";

function Pests({
  pests,
  showPests,
  setShowPests,
  search,
}) {
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [treatment, setTreatment] = useState("");

  const addPest = async () => {
    if (!name || !symptoms || !treatment) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/pests/", {
        name: name,
        symptoms: symptoms,
        treatment: treatment,
      });

      alert("Pest added successfully");

      setName("");
      setSymptoms("");
      setTreatment("");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add pest");
    }
  };

  const deletePest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pest?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/pests/${id}`);

      alert("Pest deleted successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete pest");
    }
  };

  return (
    <div className="card">
      <h2>🐛 Pests</h2>

      <h3>Add New Pest</h3>

      <input
        type="text"
        placeholder="Pest Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <input
        type="text"
        placeholder="Treatment"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />

      <button onClick={addPest}>
        Add Pest
      </button>

      <hr />

      <button onClick={() => setShowPests(!showPests)}>
        {showPests ? "Hide Pests" : "View Pests"}
      </button>

      <p>Total Pests: {pests.length}</p>

      {showPests &&
        pests
          .filter((pest) =>
            pest.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((pest) => (
            <div key={pest.id}>
              <h3>{pest.name}</h3>

              <p>Symptoms: {pest.symptoms}</p>

              <p>Treatment: {pest.treatment}</p>

              <button onClick={() => deletePest(pest.id)}>
                🗑️ Delete
              </button>

              <hr />
            </div>
          ))}
    </div>
  );
}

export default Pests;