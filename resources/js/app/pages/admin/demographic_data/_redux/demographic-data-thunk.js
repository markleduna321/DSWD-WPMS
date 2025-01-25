// src/redux/thunks/demographicDataThunk.js
import { create_demographic_service, get_demographics_service } from '@/app/services/demographic-data-service';
import { demographicSlice } from './demographic-data-slice';

// Action types
const CREATE_DEMOGRAPHIC_REQUEST = 'CREATE_DEMOGRAPHIC_REQUEST';
const CREATE_DEMOGRAPHIC_SUCCESS = 'CREATE_DEMOGRAPHIC_SUCCESS';
const CREATE_DEMOGRAPHIC_FAILURE = 'CREATE_DEMOGRAPHIC_FAILURE';

// Action creators
const createDemographicRequest = () => ({
    type: CREATE_DEMOGRAPHIC_REQUEST
});

const createDemographicSuccess = (data) => ({
    type: CREATE_DEMOGRAPHIC_SUCCESS,
    payload: data
});

const createDemographicFailure = (error) => ({
    type: CREATE_DEMOGRAPHIC_FAILURE,
    payload: error
});

// Thunk function for creating demographic data
// export const create_demographic_thunk = (data) => {
//     return async (dispatch) => {
//         dispatch(createDemographicRequest());
//         try {
//             const response = await create_demographic_service(data);
//             dispatch(createDemographicSuccess(response));
//         } catch (error) {
//             dispatch(createDemographicFailure(error.message));
//         }
//     };
// };
export function create_demographic_thunk(data) {
    return async function (dispatch, getState) {
        const result = await create_demographic_service(data);
        return result
    };
}

// Thunk to fetch all users
export function get_demographics_thunk() {
    return async function (dispatch) {
        try {
            const result = await get_demographics_service();
            console.log("Fetched demographic:", result);
            dispatch(demographicSlice.actions.setDemographics(result));
        } catch (error) {
            console.error("Error fetching demographic:", error);
        }
    };
}