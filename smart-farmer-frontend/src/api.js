import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://10.248.31.56:8000"
      : "https://smart-farmer-34kl.onrender.com",
});

export default API;