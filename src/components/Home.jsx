import React, { useState } from "react";
import Wrapper from "../components/Wrapper.jsx";
import Card2 from "../components/Card2.jsx";

const Home = ({ profiles, darkMode }) => {
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 6; // Change this number based on how many profiles per page

    // Calculate total pages
    const totalPages = Math.ceil(profiles.length / profilesPerPage);

    // Slice the profiles to display only those for the current page
    const startIndex = (currentPage - 1) * profilesPerPage;
    const currentProfiles = profiles.slice(startIndex, startIndex + profilesPerPage);

    // Pagination handlers
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <Wrapper>
            <h1>Profile App</h1>
            <div className="profile-cards">
                {currentProfiles.map(profile => (
                    <Card2 key={profile.id} {...profile} darkMode={darkMode} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </Wrapper>
    );
};

export default Home;
