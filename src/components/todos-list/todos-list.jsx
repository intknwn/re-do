import React from 'react';
import { useSelector } from 'react-redux';

import { List } from '@chakra-ui/react';
import Stack from '../styled/Stack';

import TodoItem from '../../components/todo-item/todo-item';
import Filters from '../../components/filters/filters';

import { selectSortedTodos } from '../../features/todos/todosSlice';

const TodosList = () => {
  const todos = useSelector(selectSortedTodos);

  return (
    <Stack direction="column" borderRadius="10" spacing="5" padding="3">
      <Filters />
      <List spacing="10">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Stack>
  );
};

export default TodosList;
