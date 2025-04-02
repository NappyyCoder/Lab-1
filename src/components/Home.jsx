import React, { useCallback, useMemo, useReducer, useEffect, lazy, Suspense, memo, useState } from 'react';
import styles from '../styles/home.module.css';
import { useProfileSearch } from '../hooks/useProfileSearch';
import { paginationReducer, initialState } from '../reducers/homeReducer';

// Lazy load components
const SearchSection = lazy(() => import('./SearchSection'));
const ProfileGrid = lazy(() => import('./ProfileGrid'));
const PaginationSection = lazy(() => import('./PaginationSection'));

const Home = ({ darkMode }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('https://web.ics.purdue.edu/~clayl/test/fetch-data.php');
                const data = await response.json();
                setProfiles(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profiles');
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const {
        filteredProfiles,
        searchTerms,
        setGeneralSearch,
        setTitleSearch,
        setEmailSearch,
        resultsCount,
        uniqueTitles
    } = useProfileSearch(profiles);

    const [paginationState, dispatch] = useReducer(paginationReducer, initialState);

    useEffect(() => {
        dispatch({
            type: 'SET_TOTAL_PAGES',
            payload: Math.ceil(filteredProfiles.length / paginationState.profilesPerPage)
        });
        dispatch({ type: 'RESET' });
    }, [filteredProfiles]);

    const handlePrevPage = useCallback(() => {
        dispatch({ type: 'PREV_PAGE' });
    }, []);

    const handleNextPage = useCallback(() => {
        dispatch({ type: 'NEXT_PAGE' });
    }, []);

    const currentProfiles = useMemo(() => {
        const startIndex = (paginationState.currentPage - 1) * paginationState.profilesPerPage;
        return filteredProfiles.slice(
            startIndex,
            startIndex + paginationState.profilesPerPage
        );
    }, [filteredProfiles, paginationState.currentPage, paginationState.profilesPerPage]);

    if (loading) {
        return <div className={styles.loading}>Loading profiles...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={`${styles.homeContainer} ${darkMode ? styles.darkMode : ''}`}>
            <h1 className={styles.title}>Profile Directory</h1>

            <Suspense fallback={<div>Loading search...</div>}>
                <SearchSection
                    searchTerms={searchTerms}
                    setGeneralSearch={setGeneralSearch}
                    setTitleSearch={setTitleSearch}
                    setEmailSearch={setEmailSearch}
                    uniqueTitles={uniqueTitles}
                    resultsCount={resultsCount}
                />
            </Suspense>

            <Suspense fallback={<div>Loading profiles...</div>}>
                <ProfileGrid
                    profiles={currentProfiles}
                    darkMode={darkMode}
                />
            </Suspense>

            <Suspense fallback={<div>Loading pagination...</div>}>
                <PaginationSection
                    currentPage={paginationState.currentPage}
                    totalPages={paginationState.totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                />
            </Suspense>
        </div>
    );
};

export default Home;
