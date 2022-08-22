import { createSlice } from '@reduxjs/toolkit';

export const StatusSorting = {
  ORIGINAL: `original`,
  COMPLETED: `completed`,
  ACTIVE: `active`,
};

const initialState = {
  status: StatusSorting.ORIGINAL,
  date: null,
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    statusSortingChanged(state, action) {
      return { ...state, status: action.payload };
    },
  },
});

export const selectStatusSortingType = state => state.sorting.status;

export const { statusSortingChanged } = sortingSlice.actions;

export default sortingSlice.reducer;
