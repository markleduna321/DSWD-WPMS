import { createSlice } from '@reduxjs/toolkit'

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split('&')[0];

export const demographicSlice = createSlice({
  name: 'demographic',
  initialState: {
    demographics: [],
    demographic:{},
  },
  reducers: {
    setDemographics: (state, action) => {
      state.demographics = action.payload;
    },
    setDemographic: (state, action) => {
        state.demographic = action.payload;
      },
  },
});

export const { 
    setDemographics,
    setDemographic
 } = demographicSlice.actions

export default demographicSlice.reducer