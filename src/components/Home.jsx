import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import Card2 from "./Card2.jsx";
import styles from "../styles/home.module.css";
import { useProfileSearch } from "../hooks/useProfileSearch";

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
    const {
        filteredProfiles,
        searchTerms,
        setGeneralSearch,
        setTitleSearch,
        setEmailSearch,
        resultsCount,
        uniqueTitles
    } = useProfileSearch(profiles);

    const [paginationState, dispatch] = useReducer(paginationReducer, {
        currentPage: 1,
        totalPages: 1,
        profilesPerPage: 8
    });

    useEffect(() => {
        dispatch({
            type: 'SET_TOTAL_PAGES',
            payload: Math.ceil(filteredProfiles.length / paginationState.profilesPerPage)
        });
        dispatch({ type: 'RESET' });
    }, [filteredProfiles]);

    const startIndex = (paginationState.currentPage - 1) * paginationState.profilesPerPage;
    const currentProfiles = filteredProfiles.slice(
        startIndex,
        startIndex + paginationState.profilesPerPage
    );

    return (
        <div className={`${styles.homeContainer} ${darkMode ? styles.darkMode : ''}`}>
            <h1 className={styles.title}>Profile Directory</h1>

            <div className={styles.searchContainer}>
                <div className={styles.searchFields}>
                    <div className={styles.searchField}>
                        <input
                            type="text"
                            placeholder="Search all fields..."
                            value={searchTerms.general}
                            onChange={(e) => setGeneralSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.advancedSearch}>
                        <div className={styles.searchField}>
                            <select
                                value={searchTerms.title}
                                onChange={(e) => setTitleSearch(e.target.value)}
                                className={styles.searchSelect}
                            >
                                <option value="">Select Title...</option>
                                {uniqueTitles.map(title => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.searchField}>
                            <input
                                type="text"
                                placeholder="Search by email..."
                                value={searchTerms.email}
                                onChange={(e) => setEmailSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                </div>

                <p className={styles.resultsCount}>
                    Found {resultsCount} profile(s)
                </p>
            </div>

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
