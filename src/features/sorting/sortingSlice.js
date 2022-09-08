import { createSlice } from '@reduxjs/toolkit';

export const SortType = {
  COMPLETED: `completed`,
  ACTIVE: `active`,
  NEWER: `newer`,
  OLDER: `older`,
};

const initialState = {
  sortType: null,
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    sortTypeChanged(state, action) {
      return { ...state, sortType: action.payload };
    },
  },
});

export const selectSortType = state => state.sorting.sortType;

export const { sortTypeChanged } = sortingSlice.actions;

export default sortingSlice.reducer;
