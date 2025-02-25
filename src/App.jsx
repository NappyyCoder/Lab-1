import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddProfile from "./components/AddProfile.jsx";
import About from "./components/About.jsx";
import NotFound from "./components/NotFound.jsx";
import Wrapper from "./components/Wrapper.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import EditProfile from "./components/EditProfile.jsx";
import { ModeProvider, useMode } from "./context/ModeContext.jsx";

import "./App.css";

function AppContent() {
  const { darkMode } = useMode();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://web.ics.purdue.edu/~clayl/test/fetch-data.php")
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(text || 'Failed to fetch profiles');
          });
        }
        return res.json();
      })
      .then(data => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profiles:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home profiles={profiles} darkMode={darkMode} />} />
            <Route path="/home" element={<Home profiles={profiles} darkMode={darkMode} />} />
            <Route path="/add-profile" element={<AddProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:id" element={<ProfileDetail profiles={profiles} />} />
            <Route path="/profile/:id/edit" element={<EditProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      </main>
    </HashRouter>
  );
}

function App() {
  return (
    <ModeProvider>
      <AppContent />
    </ModeProvider>
  );
}

export default App;
