import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: false,
  details: {},
  theme: 'blue',
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
    colorThemeChanged(state, action) {
      return { ...state, theme: action.payload };
    },
  },
});

export const selectUserAuthStatus = state => state.user.auth;

export const selectColorTheme = state => state.user.theme;

export const { userAuthStatusChanged, userDetailsAdded, colorThemeChanged } =
  userSlice.actions;

export default userSlice.reducer;
