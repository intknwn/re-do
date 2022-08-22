import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import filtersReducers from './features/filters/filtersSlice';
import sortingReducer from './features/sorting/sortingSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducers,
    sorting: sortingReducer,
  },
});

export default store;
