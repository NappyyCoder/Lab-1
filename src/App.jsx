import styles from "./styles/card.module.css";
import "./App.css";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Card2 from "./components/Card2.jsx";
import Wrapper from "./components/Wrapper.jsx";
import ProfileForm from "./components/ProfileForm.jsx";
import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const switchMode = () => setDarkMode(!darkMode);

  // State to store fetched data
  const [profiles, setProfiles] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 6; // Change this number based on how many profiles per page

  // Fetch data on component mount
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~clayl/test/fetch-data.php")
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Titles to filter by
  const titles = ["All", ...new Set(profiles.map(profile => profile.title))];

  const [title, setTitle] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProfiles = profiles.filter(profile =>
    (title === "All" || profile.title === title) &&
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const startIndex = (currentPage - 1) * profilesPerPage;
  const currentProfiles = filteredProfiles.slice(startIndex, startIndex + profilesPerPage);

  const handleTitleChange = event => setTitle(event.target.value);
  const handleSearchChange = event => setSearch(event.target.value);
  const handleReset = () => {
    setTitle("All");
    setSearch("");
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      <header>
        <Navbar darkMode={darkMode} switchMode={switchMode} />
      </header>
      <main>
        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
          <ProfileForm />
        </Wrapper>
        <Wrapper>
          <div className="filter-wrapper">
            <label htmlFor="title-select">Filter by title: </label>
            <select id="title-select" value={title} onChange={handleTitleChange}>
              {titles.map((t, index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
            <input
              type="text"
              id="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name..."
            />
            <button onClick={handleReset}>Reset</button>
          </div>
        </Wrapper>
        <Wrapper>
          <div className="profile-cards">
            {currentProfiles.map(profile => (
              <Card2 key={profile.id} {...profile} darkMode={darkMode} />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </Wrapper>
      </main>
    </>
  );
}

export default App;
