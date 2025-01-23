import "./styles/card.css";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Card1 from "./components/Card1.jsx";
import Card2 from "./components/Card2.jsx";
import Wrapper from "./components/Wrapper.jsx";
import image_man from "./assets/photo1.png";
import image_woman from "./assets/photo2.jpg";
import { useState } from "react";


import './App.css';

function App() {
  const profiles = [
    {
      img: image_man,
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'clayleo116@gmail.com',
    },
    {
      img: image_woman,
      name: 'Lily Smith',
      title: 'Computer Engineer',
      email: 'clayleo1136@gmail.com',
    },
  ];
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <div className="profile-cards">
            {profiles.map(profile => (
              <Card2 key={profile.email} {...profile} />
            ))}
          </div>
        </Wrapper>
      </main>
    </>
  );
}

export default App;