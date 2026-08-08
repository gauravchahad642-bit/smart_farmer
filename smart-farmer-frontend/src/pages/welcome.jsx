import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)"
    }}>
      <div style={{
        width: "420px",
        padding: "40px",
        textAlign: "center",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)"
      }}>
        <h1 style={{ color: "#1b5e20" }}>🌱 Smart Farmer</h1>

        <p style={{ fontSize: "18px", color: "#555" }}>
          Smart Farming Solution for Modern Agriculture
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            background: "#1b5e20",
            color: "white",
            cursor: "pointer"
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;