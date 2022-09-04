import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';

import {
  selectStatus,
  selectColors,
  StatusFilters,
} from '../filters/filtersSlice';

import { selectSortType, SortType } from '../sorting/sortingSlice';

import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodoText,
  updateTodoColor,
} from '../../firebase/functions';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoReset() {
      return [];
    },
    todoAdded(state, action) {
      return [...state, action.payload];
    },
    todoAddedLocally: {
      reducer(state, action) {
        return [...state, action.payload];
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            created: new Date().toISOString(),
          },
        };
      },
    },
    todoDeleted(state, action) {
      const id = action.payload;

      return state.filter(todo => todo.id !== id);
    },
    todoToggled(state, action) {
      const id = action.payload;

      return state.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      });
    },
    todoTextEdited(state, action) {
      const { id, text } = action.payload;

      return state.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          text,
        };
      });
    },
    todoColorChanged(state, action) {
      const { id, color } = action.payload;

      return state.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          color,
        };
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getTodos.fulfilled, (state, action) => action.payload);
  },
});

export const selectTodos = state => state.todos;

export const selectFilteredTodos = createSelector(
  selectTodos,
  selectStatus,
  selectColors,
  (todos, status, colors) => {
    const isAllStatus = status === StatusFilters.ALL;

    if (isAllStatus && !colors.length) {
      return todos;
    }

    const isCompleted = status === StatusFilters.COMPLETED;

    return todos.filter(todo => {
      const statusMatches = isAllStatus || todo.isCompleted === isCompleted;
      const colorMatches = !colors.length || colors.includes(todo.color);

      return statusMatches && colorMatches;
    });
  }
);

export const selectSortedTodos = createSelector(
  selectFilteredTodos,
  selectSortType,
  (todos, sortType) => {
    const checkIfCompleted = todo => todo.isCompleted === true;
    const getTodoTime = todo => new Date(todo.created).getTime();

    const SortFn = {
      [SortType.COMPLETED]: (leftTodo, rightTodo) => {
        if (!checkIfCompleted(leftTodo) && checkIfCompleted(rightTodo)) {
          return 1;
        }

        if (checkIfCompleted(leftTodo) && !checkIfCompleted(rightTodo)) {
          return -1;
        }

        return 0;
      },
      [SortType.ACTIVE]: (leftTodo, rightTodo) => {
        if (checkIfCompleted(leftTodo) && !checkIfCompleted(rightTodo)) {
          return 1;
        }

        if (!checkIfCompleted(leftTodo) && checkIfCompleted(rightTodo)) {
          return -1;
        }

        return 0;
      },
      [SortType.NEWER]: (leftTodo, rightTodo) =>
        getTodoTime(rightTodo) - getTodoTime(leftTodo),
      [SortType.OLDER]: (leftTodo, rightTodo) =>
        getTodoTime(leftTodo) - getTodoTime(rightTodo),
    };

    return [...todos].sort(SortFn[sortType]);
  }
);

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async uid => await fetchTodos(uid)
);

export const todoAddedAsync = createAsyncThunk(
  'todos/todoAddedAsync',
  async (
    { text, created = new Date().toISOString(), isCompleted = false },
    { getState, dispatch }
  ) => {
    const { user } = getState();

    const todo = {
      uid: user.details.uid,
      text,
      created,
      isCompleted,
    };

    try {
      await addTodo(todo);

      dispatch(todoAdded(todo));
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  }
);

export const todoDeletedAsync = createAsyncThunk(
  `todos/todoDeletedAsync`,
  async (id, { dispatch }) => {
    try {
      await deleteTodo(id);

      dispatch(todoDeleted(id));
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  }
);

export const todoToggledAsync = createAsyncThunk(
  `todos/todoToggledAsync`,
  async (todo, { dispatch }) => {
    try {
      await toggleTodo(todo);

      dispatch(todoToggled(todo.id));
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  }
);

export const todoTextEditedAsync = createAsyncThunk(
  `todos/todoTextEditedAsync`,
  async ({ id, text }, { dispatch }) => {
    try {
      await updateTodoText(id, text);

      dispatch(todoTextEdited({ id, text }));
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  }
);

export const todoColorChangedAsync = createAsyncThunk(
  `todos/todoColorChangedAsync`,
  async ({ id, color }, { dispatch }) => {
    try {
      await updateTodoColor(id, color);

      dispatch(todoColorChanged({ id, color }));
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  }
);

export const {
  todoReset,
  todoAdded,
  todoAddedLocally,
  todoDeleted,
  todoToggled,
  todoTextEdited,
  todoColorChanged,
} = todosSlice.actions;

export default todosSlice.reducer;
