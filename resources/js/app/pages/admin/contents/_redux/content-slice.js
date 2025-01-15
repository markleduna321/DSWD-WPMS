import { createSlice } from '@reduxjs/toolkit'

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split('&')[0];

export const contentsSlice = createSlice({
  name: 'contents',
  initialState: {
    contents: [],
    content:{},
  },
  reducers: {
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    setContent: (state, action) => {
        state.content = action.payload;
      },
  },
});

export const { 
  setContents,
  setContent
 } = contentsSlice.actions

export default contentsSlice.reducer