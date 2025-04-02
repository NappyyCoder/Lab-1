// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { toggleDarkMode } from '../store/modeSlice';
import styles from "../styles/navbar.module.css";

const Navbar = () => {
    const darkMode = useSelector((state) => state.mode.darkMode);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: "/home", label: "Home" },
        ...(isAuthenticated ? [{ path: "/add-profile", label: "Add Profile" }] : []),
        { path: "/about", label: "About" }
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/home');
        });
    };

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
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className={styles.authButton}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className={styles.authButton}>
                            Login
                        </Link>
                    )}
                    <button
                        onClick={() => dispatch(toggleDarkMode())}
                        className={styles.modeToggle}
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
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
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className={styles.authButton}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className={styles.authButton}>
                            Login
                        </Link>
                    )}
                    <button onClick={() => { dispatch(toggleDarkMode()); toggleMobileMenu(); }} className={styles.modeToggle}>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
