import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const initialState = {
  status: StatusFilters.ALL,
  colors: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusChanged(state, action) {
      return { ...state, status: action.payload };
    },
    colorChanged(state, action) {
      return { ...state, colors: action.payload };
    },
  },
});

export const selectStatus = state => state.filters.status;

export const selectColors = state => state.filters.colors;

export const { statusChanged, colorChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
