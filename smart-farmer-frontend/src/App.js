import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./api";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Crops from "./components/Crops";
import Fertilizers from "./components/Fertilizers";
import Pests from "./components/Pests";
import Recommendations from "./components/Recommendations";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";
import VoiceAssistant from "./components/VoiceAssistant";
import SearchBar from "./components/SearchBar";
import Charts from "./components/Charts";
import Weather from "./components/Weather";
import Footer from "./components/Footer";
import FarmingTips from "./components/FarmingTips";
import DownloadReport from "./components/DownloadReport";
import AIRecommendation from "./components/AIRecommendation";
import Welcome from "./pages/Welcome";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [crops, setCrops] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [pests, setPests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [users, setUsers] = useState([]);

  const [showCrops, setShowCrops] = useState(false);
  const [showFertilizers, setShowFertilizers] = useState(false);
  const [showPests, setShowPests] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [search, setSearch] = useState("");

  const registerUser = async () => {
    try {
      const response = await API.post("/users/", {
        name,
        email,
        password,
      });

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await API.post("/users/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", response.data.access_token);

      alert("Login Successful");

      setIsLoggedIn(true);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged Out Successfully");
  };

  useEffect(() => {
    API.get("/crops/")
      .then((res) => setCrops(res.data))
      .catch((err) => console.log(err));

    API.get("/fertilizers/")
      .then((res) => setFertilizers(res.data))
      .catch((err) => console.log(err));

    API.get("/pests/")
      .then((res) => setPests(res.data))
      .catch((err) => console.log(err));

    API.get("/recommendations/")
      .then((res) => setRecommendations(res.data))
      .catch((err) => console.log(err));

    API.get("/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const DashboardPage = () => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="App">
        <Header />

        <Dashboard
          crops={crops}
          fertilizers={fertilizers}
          pests={pests}
          recommendations={recommendations}
          users={users}
        />

        <Charts
          crops={crops}
          fertilizers={fertilizers}
          pests={pests}
          recommendations={recommendations}
          users={users}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="container">
          <Crops
            crops={crops}
            showCrops={showCrops}
            setShowCrops={setShowCrops}
            search={search}
          />

          <Fertilizers
            fertilizers={fertilizers}
            showFertilizers={showFertilizers}
            setShowFertilizers={setShowFertilizers}
            search={search}
          />

          <Pests
            pests={pests}
            showPests={showPests}
            setShowPests={setShowPests}
            search={search}
          />

          <Recommendations
            recommendations={recommendations}
            showRecommendations={showRecommendations}
            setShowRecommendations={setShowRecommendations}
            search={search}
          />

          <Users
            users={users}
            showUsers={showUsers}
            setShowUsers={setShowUsers}
          />

          <Weather />
          <AIRecommendation />
          <FarmingTips />

          <DownloadReport
            crops={crops}
            fertilizers={fertilizers}
            pests={pests}
            recommendations={recommendations}
            users={users}
          />

          <VoiceAssistant />
          <Footer />
        </div>
      </div>
    );
  };

  const LoginPage = () => {
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="container">
        <Login
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          loginUser={loginUser}
          logoutUser={logoutUser}
          isLoggedIn={isLoggedIn}
        />

        <Register
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          registerUser={registerUser}
          isLoggedIn={isLoggedIn}
        />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;