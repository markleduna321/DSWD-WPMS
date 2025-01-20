import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../pages/admin/user_management/_redux/user-management-slice';
import demographicSlice from '../pages/admin/demographic_data/_redux/demographic-data-slice';
import contentsSlice from '../pages/admin/contents/_redux/content-slice';

const store = configureStore({
    reducer: {
        users: usersSlice,
        demographic: demographicSlice,
        contents: contentsSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
