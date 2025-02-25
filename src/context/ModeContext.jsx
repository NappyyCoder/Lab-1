import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ModeContext = createContext();

// Custom hook to use the mode context
export const useMode = () => useContext(ModeContext);

// Provider component
export const ModeProvider = ({ children }) => {
  // Check if dark mode preference is stored in localStorage
  const storedDarkMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(storedDarkMode === 'true');

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and body class when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    
    // Update body class for global styling
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Value to be provided to consumers
  const value = {
    darkMode,
    toggleDarkMode
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};