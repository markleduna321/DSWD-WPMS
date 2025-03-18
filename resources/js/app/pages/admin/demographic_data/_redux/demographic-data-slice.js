import { deleteDemographicService } from "@/app/services/demographic-data-service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Define async thunk for deleting a demographic
export const deleteDemographic = createAsyncThunk(
  "demographic/deleteDemographic",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteDemographicService(id); // Calls the service
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const demographicSlice = createSlice({
  name: "demographic",
  initialState: {
    demographics: {
      data: [],
    },
    demographic: {},
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setDemographics: (state, action) => {
      console.log("Demo slice", action.payload);
      state.demographics = action.payload;
    },
    setDemographic: (state, action) => {
      state.demographic = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDemographic.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDemographic.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted item from state
        state.demographics.data = state.demographics.data.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteDemographic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDemographics,
  setDemographic,
  setLoading,
  setError,
  resetError,
} = demographicSlice.actions;

export const selectDemographics = (state) => state.demographic.demographics;
export const selectDemographic = (state) => state.demographic.demographic;
export const selectLoading = (state) => state.demographic.loading;
export const selectError = (state) => state.demographic.error;

export default demographicSlice.reducer;
