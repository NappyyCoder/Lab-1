import { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";

const Navbar = ({ switchMode, darkMode }) => {

    return (
        <div className={`${styles["navBarDiv"]} ${darkMode ? styles["darkMode"] : ""}`}>

            <a href="#" className={`${styles["links"]} ${darkMode ? styles["darkMode"] : ""}`}>Home</a>
            <a href="#" className={`${styles["links"]} ${darkMode ? styles["darkMode"] : ""}`}>About</a>
            <a href="#" className={`${styles["links"]} ${darkMode ? styles["darkMode"] : ""}`}>Other</a>
            <button className={`${styles["button"]} ${darkMode ? styles["darkMode"] : ""}`} onClick={switchMode}>Switch Mode</button>


        </div>
    );
};

export default Navbar;