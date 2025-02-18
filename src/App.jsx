import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../components/Home.jsx";
import AddProfile from "../components/AddProfile.jsx";
import About from "../components/About.jsx";
import NotFound from "../components/NotFound.jsx";
import Wrapper from ".//components/Wrapper.jsx";

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
          <Switch>
            <Routes>
              <Route exact path="/" render={() => <Home profiles={profiles} darkMode={darkMode} />} />
              <Route path="/add-profile" component={AddProfile} />
              <Route path="/about" component={About} />
              <Route component={NotFound} /> {/* Default route for 404 */}
            </Routes>
          </Switch>
        </Wrapper>
      </main>
    </HashRouter>
  );
}

export default App;
