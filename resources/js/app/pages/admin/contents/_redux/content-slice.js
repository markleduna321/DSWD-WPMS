import { createSlice } from '@reduxjs/toolkit';

export const contentsSlice = createSlice({
  name: 'contents',
  initialState: {
    contents: [],
    loading: false,
    error: null,
    currentPage: 1, // Added for pagination
    totalPages: 1,  // Added for pagination
  },
  reducers: {
    setContents: (state, action) => {
      state.contents = action.payload.contents; // Set the paginated content data
      state.currentPage = action.payload.currentPage; // Set the current page
      state.totalPages = action.payload.totalPages; // Set the total number of pages
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Exporting actions and reducer as they are
export const { setContents, setLoading, setError } = contentsSlice.actions;

export default contentsSlice.reducer;
