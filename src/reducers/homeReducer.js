export const initialState = {
    currentPage: 1,
    totalPages: 1,
    profilesPerPage: 8
};

export const paginationReducer = (state, action) => {
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
        case "FETCH_PROFILES":
            return {
                ...state,
                profiles: action.payload
            };

        default:
            return state;
    }
};
