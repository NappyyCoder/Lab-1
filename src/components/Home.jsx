import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card2 from "./Card2.jsx";
import styles from "../styles/home.module.css";

const Home = ({ profiles, darkMode }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 8;
    const totalPages = Math.ceil(profiles.length / profilesPerPage);

    // Reset to first page when profiles change
    useEffect(() => {
        setCurrentPage(1);
    }, [profiles]);

    // Calculate profiles for current page
    const startIndex = (currentPage - 1) * profilesPerPage;
    const currentProfiles = profiles.slice(startIndex, startIndex + profilesPerPage);

    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    if (!profiles.length) {
        return (
            <div className={`${styles.emptyState} ${darkMode ? styles.darkMode : ''}`}>
                <h2>No Profiles Found</h2>
                <p>Start by adding some profiles to your collection.</p>
                <Link to="/add-profile" className={styles.paginationButton}>
                    Add Your First Profile
                </Link>
            </div>
        );
    }

    return (
        <div className={`${styles.homeContainer} ${darkMode ? styles.darkMode : ''}`}>
            <h1 className={styles.title}>Profile Directory</h1>

            <div className={styles.profileGrid}>
                {currentProfiles.map((profile, index) => (
                    <div
                        className={styles.profileCard}
                        key={profile.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none' }}>
                            <Card2 {...profile} darkMode={darkMode} />
                        </Link>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                    <button
                        className={styles.paginationButton}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Previous
                    </button>

                    <div className={styles.paginationInfo}>
                        Page {currentPage} of {totalPages}
                    </div>

                    <button
                        className={styles.paginationButton}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
