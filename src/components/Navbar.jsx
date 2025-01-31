import { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check localStorage for saved theme
        const savedMode = localStorage.getItem("mode");
        if (savedMode === "dark") {
            setIsDarkMode(true);
            document.body.classList.add("dark-mode");
        }
    }, []);

    const toggleMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;

            if (newMode) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("mode", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("mode", "light");

                // 🔥 Force a repaint
                document.body.style.display = "none";
                document.body.offsetHeight; // Trigger reflow
                document.body.style.display = "block";
            }

            console.log("Body classList:", document.body.classList);
            return newMode;
        });
    };

    return (
        <nav className={styles.navbar}>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Profiles</a></li>
            </ul>
            <button className={styles.modeToggle} onClick={toggleMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </nav>
    );
};

export default Navbar;