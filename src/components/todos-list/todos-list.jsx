import React from 'react';
import { useSelector } from 'react-redux';

import { Stack, List } from '@chakra-ui/react';

import TodoItem from '../../components/todo-item/todo-item';
import Filters from '../../components/filters/filters';

import { selectSortedTodos } from '../../features/todos/todosSlice';

const TodosList = () => {
  const todos = useSelector(selectSortedTodos);

  return (
    <Stack
      direction="column"
      bg="gray.50"
      borderRadius="10"
      spacing="3"
      padding="3"
    >
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
