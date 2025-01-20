import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetch_all_contents_service,create_content_service } from "@/app/services/content-service";
import { contentsSlice } from "./content-slice";



// // Thunk to save new content
// export const saveContent = createAsyncThunk(
//   'content/saveContent',
//   async (formData, thunkAPI) => {
//     try {
//       const response = await create_content_service(formData); // Call service function
//       return response.data; // Return the created content
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || 'An error occurred while saving content.'
//       );
//     }
//   }
// );
export function saveContent(formData) {
  return async function (dispatch, getState) {
      await create_content_service(formData);
    return 'success'
  };
}



/* export function fetchAllContents(product_id) {
  return async function (dispatch, getState) {
    const data = await fetch_all_contents_service();
    dispatch(contentsSlice.actions.setContents(data));

  };
} */

export function fetchAllContents(page = 1) {
  return async function (dispatch, getState) {
    try {
      const data = await fetch_all_contents_service(page); // Pass page number
      dispatch(contentsSlice.actions.setContents(data)); // Store paginated data
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };
}

// export function get_user_login_thunk() {
//   return async function (dispatch, getState) {
//     const res = await get_user_login_service(3)
//     dispatch(appSlice.actions.setUser(res));
//     return res
//   }
// }