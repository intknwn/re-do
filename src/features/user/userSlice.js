import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: false,
  details: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuthStatusChanged(state, action) {
      return { ...state, auth: action.payload };
    },
    userDetailsAdded(state, action) {
      return { ...state, details: action.payload };
    },
  },
});

export const selectUserAuthStatus = state => state.user.auth;

export const { userAuthStatusChanged, userDetailsAdded } = userSlice.actions;

export default userSlice.reducer;
