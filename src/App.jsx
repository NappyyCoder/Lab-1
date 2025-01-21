import "./styles/card.css/"
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Card1 from "./components/Card1.jsx";
import Card2 from "./components/Card2.jsx";

import './App.css'

function App() {


  return (
    <>
      <header>

        <Navbar />

      </header>
      <main>
        <div className="section">
          <div className="container">
          </div>
          <About />
        </div>
        <div className="section">
          <div className="container">
            <div className="profile-cards">
              <Card1 />
              <Card2 />
            </div>
          </div>
        </div>
      </main>




    </>

  )
}

export default App
