import { useState, useEffect, useMemo } from 'react';

export const useProfileSearch = (profiles, initialSearchTerms = { general: '', title: '', email: '' }) => {
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);
    const [searchTerms, setSearchTerms] = useState(initialSearchTerms);

    // Get unique titles from profiles
    const uniqueTitles = useMemo(() => {
        const titles = profiles
            .map(profile => profile.title)
            .filter(title => title) // Remove null/undefined
            .filter((title, index, self) => self.indexOf(title) === index) // Remove duplicates
            .sort(); // Sort alphabetically
        return titles;
    }, [profiles]);

    const searchProfiles = useMemo(() => {
        return (profiles, terms) => {
            return profiles.filter(profile => {
                // General search across all fields
                if (terms.general) {
                    const searchString = `${profile.name} ${profile.title} ${profile.email}`.toLowerCase();
                    if (!searchString.includes(terms.general.toLowerCase())) {
                        return false;
                    }
                }

                // Specific title search
                if (terms.title) {
                    if (profile.title !== terms.title) { // Exact match for dropdown
                        return false;
                    }
                }

                // Specific email search
                if (terms.email) {
                    if (!profile.email?.toLowerCase().includes(terms.email.toLowerCase())) {
                        return false;
                    }
                }

                return true;
            });
        };
    }, []);

    useEffect(() => {
        const results = searchProfiles(profiles, searchTerms);
        setFilteredProfiles(results);
    }, [profiles, searchTerms, searchProfiles]);

    const updateSearch = (type, value) => {
        setSearchTerms(prev => ({
            ...prev,
            [type]: value
        }));
    };

    return {
        filteredProfiles,
        searchTerms,
        updateSearch,
        resultsCount: filteredProfiles.length,
        uniqueTitles,
        setGeneralSearch: (value) => updateSearch('general', value),
        setTitleSearch: (value) => updateSearch('title', value),
        setEmailSearch: (value) => updateSearch('email', value)
    };
};
