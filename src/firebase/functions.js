import { db } from './firebase';
import {
  ref,
  getDatabase,
  get,
  set,
  child,
  remove,
  update,
} from 'firebase/database';

const database = ref(db);

export const fetchTodos = async () => {
  const snapshot = await get(child(database, 'todos'));

  const todos = [];

  snapshot.forEach(child => {
    todos.push(child.val());
  });

  return todos;
};

export const addTodo = async todo => {
  return set(child(database, `todos/${todo.id}`), todo);
};

export const deleteTodo = async id => {
  return remove(child(database, `todos/${id}`));
};

export const toggleTodo = async todo => {
  return update(child(database, `todos/${todo.id}`), {
    isCompleted: !todo.isCompleted,
  });
};

export const updateTodoText = async (id, text) => {
  return update(child(database, `todos/${id}`), { text });
};

export const updateTodoColor = async (id, color) => {
  return update(child(database, `todos/${id}`), { color });
};
