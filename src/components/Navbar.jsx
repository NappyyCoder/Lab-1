// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const Navbar = ({ darkMode, switchMode }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/add-profile">Add Profile</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <button onClick={switchMode}>
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
        </nav>
    );
};

export default Navbar;
