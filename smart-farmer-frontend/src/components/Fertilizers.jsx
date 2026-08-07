function Fertilizers({
  fertilizers,
  showFertilizers,
  setShowFertilizers,
  search
}) {
  return (
    <div className="card">
      <h2>🧪 Fertilizers</h2>

      <button onClick={() => setShowFertilizers(!showFertilizers)}>
        {showFertilizers
          ? "Hide Fertilizers"
          : "View Fertilizers"}
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
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Fertilizers;