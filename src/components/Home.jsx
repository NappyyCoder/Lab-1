import React, { useCallback, useMemo, useReducer, useEffect, lazy, Suspense, memo } from 'react';
import styles from '../styles/home.module.css';
import { useProfileSearch } from '../hooks/useProfileSearch';
import { paginationReducer, initialState } from '../reducers/homeReducer';

// Lazy load components
const SearchSection = lazy(() => import('./SearchSection'));
const ProfileGrid = lazy(() => import('./ProfileGrid'));
const PaginationSection = lazy(() => import('./PaginationSection'));

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

    const [paginationState, dispatch] = useReducer(paginationReducer, initialState);

    useEffect(() => {
        dispatch({
            type: 'SET_TOTAL_PAGES',
            payload: Math.ceil(filteredProfiles.length / paginationState.profilesPerPage)
        });
        dispatch({ type: 'RESET' });
    }, [filteredProfiles]);

    // Memoize pagination handlers
    const handlePrevPage = useCallback(() => {
        dispatch({ type: 'PREV_PAGE' });
    }, []);

    const handleNextPage = useCallback(() => {
        dispatch({ type: 'NEXT_PAGE' });
    }, []);

    // Memoize current profiles calculation
    const currentProfiles = useMemo(() => {
        const startIndex = (paginationState.currentPage - 1) * paginationState.profilesPerPage;
        return filteredProfiles.slice(
            startIndex,
            startIndex + paginationState.profilesPerPage
        );
    }, [filteredProfiles, paginationState.currentPage, paginationState.profilesPerPage]);

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

export default memo(Home);
