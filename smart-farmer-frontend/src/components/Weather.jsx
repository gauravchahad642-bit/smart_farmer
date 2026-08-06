import React, { useEffect, useState } from "react";

function Weather() {
  const API_KEY = "ca38232e550d9e3e133eab06a6d19ce8";

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  if (!weather || !weather.main) {
    return (
      <div className="card">
        <h2>🌤 Weather</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🌤 Weather</h2>

      <h3>🌡 Temperature: {weather.main.temp} °C</h3>
      <p>☁ Condition: {weather.weather[0].main}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;