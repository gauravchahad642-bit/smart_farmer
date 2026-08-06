function Recommendations({
  recommendations,
  showRecommendations,
  setShowRecommendations,
}) {
  return (
    <div className="card">
      <h2>🌾 Recommendations</h2>

      <button
        onClick={() =>
          setShowRecommendations(!showRecommendations)
        }
      >
        {showRecommendations
          ? "Hide Recommendations"
          : "View Recommendations"}
      </button>

      <p>Total Recommendations: {recommendations.length}</p>

      {showRecommendations &&
        recommendations.map((item) => (
          <div key={item.id}>
            <h3>{item.crop_name}</h3>
            <p>Fertilizer: {item.fertilizer_name}</p>
            <p>Pesticide: {item.pesticide_name}</p>
            <p>Season: {item.season}</p>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Recommendations;