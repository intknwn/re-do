import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todosReducer from './features/todos/todosSlice';
import filtersReducers from './features/filters/filtersSlice';
import sortingReducer from './features/sorting/sortingSlice';
import userReducer from './features/user/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos'],
};

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducers,
  sorting: sortingReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
