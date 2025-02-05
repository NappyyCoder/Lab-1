import "./styles/card.module.css";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Card2 from "./components/Card2.jsx";
import Wrapper from "./components/Wrapper.jsx";
import ProfileForm from "./components/ProfileForm.jsx";
import image_man from "./assets/photo1.png";
import image_woman from "./assets/photo2.jpg";
import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const switchMode = () => {
    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true)
    }
    console.log(darkMode);
  }



  const profiles = [
    {
      img: image_man,
      name: "John Doe",
      title: "Software Engineer",
      email: "clayleo116@gmail.com",
    },
    {
      img: image_woman,
      name: "Lily Smith",
      title: "Computer Engineer",
      email: "LilySmith@gmail.com ",
    },
    {
      img: image_man,
      name: "Bob Johnson",
      title: "UX Designer",
      email: "Bob@gmail.com",
    },
    {
      img: image_woman,
      name: "Ava Smith",
      title: "Web Developer",
      email: "Ava1136@gmail.com",
    },
    {
      img: image_man,
      name: "John Doe",
      title: "Software Engineer",
      email: "John116@gmail.com",
    },
    {
      img: image_woman,
      name: "Eva Smith",
      title: "Graphic Designer",
      email: "Eva1136@gmail.com",
    },
  ];

  const titles = ["All", ...new Set(profiles.map((profile) => profile.title))];

  const [title, setTitle] = useState("All");
  const [search, setSearch] = useState("");



  const filteredProfiles = profiles.filter((profile) => {
    return (title === "All" || profile.title === title) &&
      profile.name.toLowerCase().includes(search.toLowerCase());
  });


  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleSearchChange = (event) => {
    setSearch(event.target.value); console.log(event.target.value);
  }
  const handleReset = () => {
    setTitle("All");
    setSearch("");
  };

  return (
    <>
      <header>
        <Navbar darkMode={darkMode} switchMode={switchMode} />
      </header>
      <main >

        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
          <ProfileForm>

          </ProfileForm>
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
            {filteredProfiles.map((profile) => (
              <Card2 key={profile.email} {...profile} darkMode={darkMode} />
            ))}
          </div>
        </Wrapper>

      </main>

    </>
  );
}

export default App;
