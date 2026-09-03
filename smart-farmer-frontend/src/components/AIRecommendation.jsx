import { useState } from "react";

function AIRecommendation() {
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [result, setResult] = useState("");

  const recommendCrop = async () => {
    try {
      const response = await fetch(
        `http://10.248.31.56:8000/recommendations/ai?soil_type=${soil}&season=${season}`
      );

      const data = await response.json();

      if (response.ok) {
        if (data.crop_name) {
          setResult(
            `🌾 Crop: ${data.crop_name}
🧪 Fertilizer: ${data.fertilizer_name}
🐛 Pesticide: ${data.pesticide_name}`
          );
        } else {
          setResult(data.message || "❌ Recommendation not available");
        }
      } else {
        setResult(data.message || "❌ Recommendation not available");
      }
    } catch (error) {
      setResult("❌ Server Error");
    }
  };

  return (
    <div className="card">
      <h2>🤖 AI Crop Recommendation</h2>

      <select
        value={soil}
        onChange={(e) => setSoil(e.target.value)}
      >
        <option value="">Select Soil Type</option>
        <option value="Black Soil">Black Soil</option>
        <option value="Red Soil">Red Soil</option>
        <option value="Alluvial Soil">Alluvial Soil</option>
        <option value="Sandy Soil">Sandy Soil</option>
        <option value="Loamy">Loamy</option>
        <option value="Clay">Clay</option>
      </select>

      <select
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      >
        <option value="">Select Season</option>
        <option value="Kharif">Kharif</option>
        <option value="Rabi">Rabi</option>
        <option value="Zaid">Zaid</option>
      </select>

      <button onClick={recommendCrop}>
        Get Recommendation
      </button>

      <h3 style={{ whiteSpace: "pre-line" }}>
        {result}
      </h3>
    </div>
  );
}

export default AIRecommendation;