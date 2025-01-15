import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDemographicData = createAsyncThunk(
    'demographicData/fetchDemographicData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/demographics');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addDemographicData = createAsyncThunk(
    'demographicData/addDemographicData',
    async (newData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/demographics', newData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateDemographicData = createAsyncThunk(
    'demographicData/updateDemographicData',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/demographic-data/${updatedData.id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteDemographicData = createAsyncThunk(
    'demographicData/deleteDemographicData',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/demographic-data/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);