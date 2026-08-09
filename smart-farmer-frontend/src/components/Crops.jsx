import { useState } from "react";
import API from "../api";

function Crops({
  crops,
  showCrops,
  setShowCrops,
  search,
}) {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [soilType, setSoilType] = useState("");

  const addCrop = async () => {
    if (!name || !season || !soilType) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/crops/", {
        name: name,
        season: season,
        soil_type: soilType,
      });

      alert("Crop added successfully");

      setName("");
      setSeason("");
      setSoilType("");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add crop");
    }
  };

  const deleteCrop = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/crops/${id}`);

      alert("Crop deleted successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete crop");
    }
  };

  return (
    <div className="card">
      <h2>🌱 Crops</h2>

      <h3>Add New Crop</h3>

      <input
        type="text"
        placeholder="Crop Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Season"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      />

      <input
        type="text"
        placeholder="Soil Type"
        value={soilType}
        onChange={(e) => setSoilType(e.target.value)}
      />

      <button onClick={addCrop}>
        Add Crop
      </button>

      <hr />

      <button onClick={() => setShowCrops(!showCrops)}>
        {showCrops ? "Hide Crops" : "View Crops"}
      </button>

      <p>Total Crops: {crops.length}</p>

      {showCrops &&
        crops
          .filter((crop) =>
            crop.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((crop) => (
            <div key={crop.id}>
              <h3>{crop.name}</h3>

              <p>Season: {crop.season}</p>

              <p>Soil Type: {crop.soil_type}</p>

              <button onClick={() => deleteCrop(crop.id)}>
                🗑️ Delete
              </button>

              <hr />
            </div>
          ))}
    </div>
  );
}

export default Crops;