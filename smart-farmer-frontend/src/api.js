import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api"
      : "https://smart-farmer-34kl.onrender.com",
});

export default API;