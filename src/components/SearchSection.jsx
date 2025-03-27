import React, { memo } from 'react';
import styles from '../styles/home.module.css';

const SearchSection = memo(({ 
    searchTerms, 
    setGeneralSearch, 
    setTitleSearch, 
    setEmailSearch, 
    uniqueTitles, 
    resultsCount 
}) => {
    return (
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
    );
});

SearchSection.displayName = 'SearchSection';

export default SearchSection;