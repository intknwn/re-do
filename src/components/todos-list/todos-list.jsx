import React from 'react';

import { Stack, List } from '@chakra-ui/react';

import TodoItem from '../../components/todo-item/todo-item';
import Filters from '../../components/filters/filters';

import { Colors } from '../../config';

const todos = [
  { id: 1, text: 'Learn HTML', color: Colors.PINK, isCompleted: true },
  { id: 2, text: 'Learn CSS', color: Colors.BLUE, isCompleted: true },
  { id: 3, text: 'Learn JS', color: Colors.ORANGE, isCompleted: false },
];

const TodosList = () => (
  <Stack
    direction="column"
    bg="gray.50"
    borderRadius="10"
    spacing="2"
    padding="3"
  >
    <Filters />
    <List spacing="2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  </Stack>
);

export default TodosList;
