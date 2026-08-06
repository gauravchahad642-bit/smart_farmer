function FarmingTips() {
  const tips = [
    "🌱 Use certified seeds for better yield.",
    "💧 Irrigate crops in the early morning or evening.",
    "🌿 Test soil before applying fertilizers.",
    "🐛 Monitor crops regularly for pests.",
    "♻️ Use organic manure whenever possible."
  ];

  return (
    <div className="card">
      <h2>🌾 Farming Tips</h2>

      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default FarmingTips;