import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import Card2 from "./Card2.jsx";
import styles from "../styles/home.module.css";

// Reducer function for pagination state management
const paginationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.payload
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                currentPage: Math.min(state.currentPage + 1, state.totalPages)
            };
        case 'PREV_PAGE':
            return {
                ...state,
                currentPage: Math.max(state.currentPage - 1, 1)
            };
        case 'RESET':
            return {
                ...state,
                currentPage: 1
            };
        default:
            return state;
    }
};

const Home = ({ profiles, darkMode }) => {
    const [paginationState, dispatch] = useReducer(paginationReducer, {
        currentPage: 1,
        totalPages: 1,
        profilesPerPage: 8
    });

    // Calculate total pages when profiles change
    useEffect(() => {
        dispatch({
            type: 'SET_TOTAL_PAGES',
            payload: Math.ceil(profiles.length / paginationState.profilesPerPage)
        });
        dispatch({ type: 'RESET' });
    }, [profiles]);

    // Calculate profiles for current page
    const startIndex = (paginationState.currentPage - 1) * paginationState.profilesPerPage;
    const currentProfiles = profiles.slice(
        startIndex,
        startIndex + paginationState.profilesPerPage
    );

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

            <div className={styles.paginationContainer}>
                <button
                    onClick={() => dispatch({ type: 'PREV_PAGE' })}
                    disabled={paginationState.currentPage === 1}
                    className={styles.paginationButton}
                >
                    Previous
                </button>
                <span>
                    Page {paginationState.currentPage} of {paginationState.totalPages}
                </span>
                <button
                    onClick={() => dispatch({ type: 'NEXT_PAGE' })}
                    disabled={paginationState.currentPage === paginationState.totalPages}
                    className={styles.paginationButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
