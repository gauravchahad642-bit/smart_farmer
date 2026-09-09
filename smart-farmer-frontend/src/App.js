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
import ProtectedRoute from "./ProtectedRoute";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";


/* =====================================================
   DASHBOARD PAGE
===================================================== */

function DashboardPage({
  crops,
  fertilizers,
  pests,
  recommendations,
  users,
  search,
  setSearch,
}) {
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

      <Weather />

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
  );
}


/* =====================================================
   LOGIN PAGE
===================================================== */

function LoginPage({
  isLoggedIn,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginUser,
  logoutUser,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  registerUser,
}) {
const navigate = useNavigate();

useEffect(() => {
  if (isLoggedIn) {
    navigate("/dashboard", { replace: true });
  }
}, [isLoggedIn, navigate]);
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
}


/* =====================================================
   CROPS PAGE
===================================================== */

function CropsPage({
  crops,
  search,
}) {
  const [showCrops, setShowCrops] = useState(true);

  return (
    <div className="App">

      <Header />

      <div className="container">

        <Crops
          crops={crops}
          showCrops={showCrops}
          setShowCrops={setShowCrops}
          search={search}
        />

      </div>

      <Footer />

    </div>
  );
}


/* =====================================================
   FERTILIZERS PAGE
===================================================== */

function FertilizersPage({
  fertilizers,
  search,
}) {
  const [showFertilizers, setShowFertilizers] = useState(true);

  return (
    <div className="App">

      <Header />

      <div className="container">

        <Fertilizers
          fertilizers={fertilizers}
          showFertilizers={showFertilizers}
          setShowFertilizers={setShowFertilizers}
          search={search}
        />

      </div>

      <Footer />

    </div>
  );
}


/* =====================================================
   PESTS PAGE
===================================================== */

function PestsPage({
  pests,
  search,
}) {
  const [showPests, setShowPests] = useState(true);

  return (
    <div className="App">

      <Header />

      <div className="container">

        <Pests
          pests={pests}
          showPests={showPests}
          setShowPests={setShowPests}
          search={search}
        />

      </div>

      <Footer />

    </div>
  );
}

/* =====================================================
   RECOMMENDATIONS PAGE
===================================================== */

function RecommendationsPage({
  recommendations,
  search,
}) {
  const [showRecommendations, setShowRecommendations] = useState(true);

  return (
    <div className="App">

      <Header />

      <div className="container">

        <Recommendations
          recommendations={recommendations}
          showRecommendations={showRecommendations}
          setShowRecommendations={setShowRecommendations}
          search={search}
        />

      </div>

      <Footer />

    </div>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  /* -------------------------
     DATA STATES
  ------------------------- */

  const [crops, setCrops] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [pests, setPests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  /* -------------------------
     REGISTER STATES
  ------------------------- */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* -------------------------
     LOGIN STATES
  ------------------------- */

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* -------------------------
     LOGIN STATUS
  ------------------------- */

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  /* -------------------------
     SEARCH
  ------------------------- */

  const [search, setSearch] = useState("");


  /* =====================================================
     REGISTER USER
  ===================================================== */

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
      console.log(error);
      alert(
        error.response?.data?.detail ||
        "Registration Failed"
      );
  }

  };


  /* =====================================================
     LOGIN USER
  ===================================================== */

  const loginUser = async () => {

    try {

      const response = await API.post(
        "/users/login",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      /* Save token */

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      /* Update login state */

      setIsLoggedIn(true);

      setLoginEmail("");
      setLoginPassword("");

      alert("Login Successful");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Login Failed"
      );
    }
  };


  /* =====================================================
     LOGOUT USER
  ===================================================== */

  const logoutUser = () => {

    localStorage.removeItem("token");

    setIsLoggedIn(false);

    alert("Logged Out Successfully");

  };


  /* =====================================================
     FETCH DATA ONLY AFTER LOGIN
  ===================================================== */

  useEffect(() => {

    if (!isLoggedIn) {
      return;
    }

    /* Crops */

    API.get("/crops/")
      .then((res) => setCrops(res.data))
      .catch((err) => console.log(err));


    /* Fertilizers */

    API.get("/fertilizers/")
      .then((res) => setFertilizers(res.data))
      .catch((err) => console.log(err));


    /* Pests */

    API.get("/pests/")
      .then((res) => setPests(res.data))
      .catch((err) => console.log(err));


    /* Recommendations */

    API.get("/recommendations/")
      .then((res) => setRecommendations(res.data))
      .catch((err) => console.log(err));


    /* Users */

    API.get("/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

  }, [isLoggedIn]);


  /* =====================================================
     ROUTING
  ===================================================== */

  return (

    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        {/* App Open → Welcome */}

        <Route
          path="/"
          element={<Welcome />}
        />


        {/* Welcome → Login/Register */}

        <Route
          path="/login"
          element={
            <LoginPage
              isLoggedIn={isLoggedIn}

              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}

              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}

              loginUser={loginUser}
              logoutUser={logoutUser}

              name={name}
              setName={setName}

              email={email}
              setEmail={setEmail}

              password={password}
              setPassword={setPassword}

              registerUser={registerUser}
            />
          }
        />


        {/* =================================================
            PROTECTED ROUTES
        ================================================= */}

        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={
              <DashboardPage
                crops={crops}
                fertilizers={fertilizers}
                pests={pests}
                recommendations={recommendations}
                users={users}
                search={search}
                setSearch={setSearch}
              />
            }
          />


          {/* Crops */}

          <Route
            path="/crops"
            element={
              <CropsPage
                crops={crops}
                search={search}
              />
            }
          />


          {/* Fertilizers */}

          <Route
            path="/fertilizers"
            element={
              <FertilizersPage
                fertilizers={fertilizers}
                search={search}
              />
            }
          />


          {/* Pests */}

          <Route
            path="/pests"
            element={
              <PestsPage
                pests={pests}
                search={search}
              />
            }
          />


          {/* AI Recommendation */}

          <Route
            path="/ai-recommendation"
            element={
              <div className="App">

                <Header />

                <div className="container">

                  <AIRecommendation />

                </div>

                <Footer />

              </div>
            }
          />


          {/* Recommendations */}

          <Route
            path="/recommendations"
            element={
              <RecommendationsPage
                recommendations={recommendations}
                search={search}
              />
            }
          />


          {/* Users - Protected */}

          <Route
            path="/users"
            element={
              <div className="App">

                <Header />

                <div className="container">

                  <Users
                    users={users}
                    showUsers={showUsers}
                    setShowUsers={setShowUsers}
                  />

                </div>

                <Footer />

              </div>
            }
          />

        </Route>


        {/* =================================================
            UNKNOWN URL
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;