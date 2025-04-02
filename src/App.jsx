import React from "react";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter, Route, Routes } from "react-router-dom";
import { ModeProvider } from "./context/ModeContext";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddProfile from "./components/AddProfile.jsx";
import About from "./components/About.jsx";
import NotFound from "./components/NotFound.jsx";
import Wrapper from "./components/Wrapper.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import EditProfile from "./components/EditProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";

import "./App.css";

function AppContent() {
  return (
    <HashRouter>
      <ModeProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/add-profile"
                element={
                  <ProtectedRoute>
                    <AddProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route
                path="/profile/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Wrapper>
        </main>
      </ModeProvider>
    </HashRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
