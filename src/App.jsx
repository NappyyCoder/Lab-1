import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddProfile from "./components/AddProfile.jsx";
import About from "./components/About.jsx";
import NotFound from "./components/NotFound.jsx";
import Wrapper from "./components/Wrapper.jsx";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const switchMode = () => setDarkMode(!darkMode);

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~clayl/test/fetch-data.php")
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <HashRouter>
      <header>
        <Navbar darkMode={darkMode} switchMode={switchMode} />
      </header>
      <main>
        <Wrapper>

          <Routes>
            <Route path="/home" element={<Home profiles={profiles} />} />
            <Route path="/add-profile" element={<AddProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Wrapper>
      </main>
    </HashRouter>
  );
}

export default App;
