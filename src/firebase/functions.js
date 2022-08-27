import { db } from './firebase';

export const getTodos = async setTodos => {
  db.ref('todos').on('value', snapshot => {
    const todos = [];

    snapshot.forEach(childSnapshot => {
      const todo = childSnapshot.val();

      todos.push(todo);
    });

    setTodos(todos);
  });
};
