import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the thunk
export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async (contentId, thunkAPI) => {
        try {
            const response = await axios.get(`/api/contents/${contentId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const saveContent = createAsyncThunk(
    'content/saveContent',
    async (formData, thunkAPI) => {
      try {
        const response = await axios.post('/api/contents', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );