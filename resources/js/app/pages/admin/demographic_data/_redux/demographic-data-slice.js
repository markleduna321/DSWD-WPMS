import { createSlice } from '@reduxjs/toolkit'

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split('&')[0];

export const demographicSlice = createSlice({
  name: 'demographic',
  initialState: {
    demographics: {
      data:[]
    },
    demographic: {},
    loading: false,
    error: null,
    currentPage: 1, // Added for pagination
    totalPages: 1,  // Added for pagination
  },
  reducers: {
    setDemographics: (state, action) => {
      console.log('Demo slice', action.payload)
      state.demographics = action.payload;
    },
    setDemographic: (state, action) => {
      state.demographic = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
    },
    setError: (state, action) => {
      state.error = action.payload; // Error message
    },
    resetError: (state) => {
      state.error = null; // Reset the error to null
    },
  },
});

export const {
  setDemographics,
  setDemographic,
  setLoading,
  setError,
  resetError
} = demographicSlice.actions

export const selectDemographics = (state) => state.demographic.demographics;
export const selectDemographic = (state) => state.demographic.demographic;
export const selectLoading = (state) => state.demographic.loading;
export const selectError = (state) => state.demographic.error;

export default demographicSlice.reducer