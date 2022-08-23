import { createSlice, createSelector } from '@reduxjs/toolkit';
import { Colors } from '../../config';
import { getMaxId } from '../../helpers';

import {
  selectStatus,
  selectColors,
  StatusFilters,
} from '../filters/filtersSlice';

import { selectSortType, SortType } from '../sorting/sortingSlice';

const initialState = [
  {
    id: 1,
    text: 'Learn HTML',
    color: Colors.PINK,
    isCompleted: false,
    created: '2022-08-23T17:55:12.403Z',
  },
  {
    id: 2,
    text: 'Learn CSS',
    color: Colors.BLUE,
    isCompleted: true,
    created: '2022-08-22T17:55:12.403Z',
  },
  {
    id: 3,
    text: 'Learn JS',
    color: Colors.ORANGE,
    isCompleted: false,
    created: '2022-08-21T17:55:12.403Z',
  },
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        const { text, created, isCompleted } = action.payload;
        const id = getMaxId(state) + 1;

        return [...state, { id, text, created, isCompleted }];
      },
      prepare(text) {
        return {
          payload: {
            text,
            created: new Date().toISOString(),
            isCompleted: false,
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
    todoTextEdited: {
      reducer(state, action) {
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
      prepare(id, color) {
        return {
          payload: { id, color },
        };
      },
    },
    todoColorChanged: {
      reducer(state, action) {
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
      prepare(id, color) {
        return {
          payload: { id, color },
        };
      },
    },
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

export const {
  todoAdded,
  todoDeleted,
  todoToggled,
  todoTextEdited,
  todoColorChanged,
} = todosSlice.actions;

export default todosSlice.reducer;
