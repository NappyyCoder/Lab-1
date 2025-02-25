// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMode } from "../context/ModeContext.jsx";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: "/home", label: "Home" },
        { path: "/add-profile", label: "Add Profile" },
        { path: "/about", label: "About" }
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className={`${styles.navbar} ${darkMode ? styles.darkMode : ''}`}>
            <div className={styles.navContent}>
                <Link to="/home" className={styles.logo}>
                    <img src="/logo.svg" alt="Logo" />
                    <span>Profile Directory</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.navLinks}>
                    {navLinks.map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`${styles.navLink} ${isActive(path) ? styles.active : ''}`}
                        >
                            {label}
                        </Link>
                    ))}
                    <button onClick={toggleDarkMode} className={styles.modeToggle}>
                        {darkMode ? (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                Light Mode
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                                Dark Mode
                            </>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className={styles.menuButton} onClick={toggleMobileMenu}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''} ${darkMode ? styles.darkMode : ''}`}>
                <button className={styles.closeButton} onClick={toggleMobileMenu}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className={styles.mobileNavLinks}>
                    {navLinks.map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`${styles.navLink} ${isActive(path) ? styles.active : ''}`}
                            onClick={toggleMobileMenu}
                        >
                            {label}
                        </Link>
                    ))}
                    <button onClick={() => { toggleDarkMode(); toggleMobileMenu(); }} className={styles.modeToggle}>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
