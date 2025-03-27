import React, { memo } from 'react';
import styles from '../styles/home.module.css';

const PaginationSection = memo(({ 
    currentPage, 
    totalPages, 
    onPrevPage, 
    onNextPage 
}) => {
    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className={styles.paginationButton}
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
            >
                Next
            </button>
        </div>
    );
});

PaginationSection.displayName = 'PaginationSection';

export default PaginationSection;