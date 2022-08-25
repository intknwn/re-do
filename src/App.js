import React from 'react';

import Date from './components/date/date';
import TodoInput from './components/todo-input/todo-input';
import TodosList from './components/todos-list/todos-list';

import { ChakraProvider, Container } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { theme } from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <Container pt="10">
        <Date />
        <TodoInput />
        <TodosList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
