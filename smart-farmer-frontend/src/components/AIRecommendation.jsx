import { useState } from "react";

function AIRecommendation() {
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [result, setResult] = useState("");

  const recommendCrop = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommendations/ai?soil_type=${soil}&season=${season}`
      );

      const data = await response.json();

      if (response.ok) {
        setResult(
          `🌾 Crop: ${data.crop_name}
🧪 Fertilizer: ${data.fertilizer_name}
🐛 Pesticide: ${data.pesticide_name}`
        );
      } else {
        setResult(data.message);
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
      <option value="Black">Black</option>
      <option value="Red">Red</option>
      <option value="Alluvial">Alluvial</option>
      <option value="Sandy">Sandy</option>
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

      <h3>{result}</h3>
    </div>
  );
}

export default AIRecommendation;