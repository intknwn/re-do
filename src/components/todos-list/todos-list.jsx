import React from 'react';
import { useSelector } from 'react-redux';

import { Text, List } from '@chakra-ui/react';
import Stack from '../styled/Stack';

import TodoItem from '../../components/todo-item/todo-item';
import Filters from '../../components/filters/filters';

import { selectSortedTodos } from '../../features/todos/todosSlice';
import { selectUserAuthStatus } from '../../features/user/userSlice';

const TodosList = () => {
  const todos = useSelector(selectSortedTodos);
  const auth = useSelector(selectUserAuthStatus);

  return (
    <Stack direction="column" borderRadius="10" spacing="5" padding="3">
      <Filters />
      {auth || todos.length > 0 ? (
        <List spacing="10">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      ) : (
        <Text textAlign="center" color="blue.500" pb="5">
          Log in to see previously created tasks or add your first task.
        </Text>
      )}
    </Stack>
  );
};

export default TodosList;
