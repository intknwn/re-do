import { createSlice, createSelector } from '@reduxjs/toolkit';
import { Colors } from '../../config';
import { getMaxId } from '../../helpers';

import {
  selectStatus,
  selectColors,
  StatusFilters,
} from '../filters/filtersSlice';

import {
  selectStatusSortingType,
  StatusSorting,
} from '../sorting/sortingSlice';

const initialState = [
  { id: 1, text: 'Learn HTML', color: Colors.PINK, isCompleted: false },
  { id: 2, text: 'Learn CSS', color: Colors.BLUE, isCompleted: true },
  { id: 3, text: 'Learn JS', color: Colors.ORANGE, isCompleted: false },
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const id = getMaxId(state) + 1;

      return [...state, { id, text: action.payload, isCompleted: false }];
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

export const getSortedByStatusTodos = createSelector(
  selectFilteredTodos,
  selectStatusSortingType,
  (todos, status) =>
    status !== StatusSorting.ORIGINAL
      ? [...todos].sort((leftTodo, rightTodo) => {
          const checkIfCompleted = todo => todo.isCompleted === true;

          if (status === StatusSorting.COMPLETED) {
            if (!checkIfCompleted(leftTodo) && checkIfCompleted(rightTodo)) {
              return 1;
            }

            if (checkIfCompleted(leftTodo) && !checkIfCompleted(rightTodo)) {
              return -1;
            }
          }

          if (status === StatusSorting.ACTIVE) {
            if (checkIfCompleted(leftTodo) && !checkIfCompleted(rightTodo)) {
              return 1;
            }

            if (!checkIfCompleted(leftTodo) && checkIfCompleted(rightTodo)) {
              return -1;
            }
          }

          return 0;
        })
      : todos
);

export const {
  todoAdded,
  todoDeleted,
  todoToggled,
  todoTextEdited,
  todoColorChanged,
} = todosSlice.actions;

export default todosSlice.reducer;
