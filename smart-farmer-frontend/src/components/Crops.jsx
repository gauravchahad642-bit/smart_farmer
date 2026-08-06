function Crops({
  crops,
  showCrops,
  setShowCrops,
  search,
}) {
  return (
    <div className="card">
      <h2>🌱 Crops</h2>

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
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Crops;