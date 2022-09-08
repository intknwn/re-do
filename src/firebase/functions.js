import { db } from './firebase';
import {
  ref,
  get,
  set,
  push,
  child,
  remove,
  update,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

const database = ref(db);

export const fetchTodos = async uid => {
  const snapshot = await get(
    query(ref(db, 'todos'), orderByChild('uid'), equalTo(uid))
  );

  const todos = [];

  snapshot.forEach(child => {
    todos.push(child.val());
  });

  return todos;
};

export const addTodo = async todo => {
  const todoId = push(child(database, 'todos')).key;

  todo.id = todoId;

  return update(database, { [`todos/${todoId}`]: todo });
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

export const createUser = async (id, name) => {
  return set(child(database, `users/${id}`), name);
};
