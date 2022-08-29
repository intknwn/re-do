import React from 'react';

import Date from './components/date/date';
import TodoInput from './components/todo-input/todo-input';
import TodosList from './components/todos-list/todos-list';
import SignIn from './components/sign-in/sign-in';

import { ChakraProvider, Container, Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { theme } from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container pt="20" pos="relative">
        <ColorModeSwitcher />
        <Box pos="absolute" right="2" top="2">
          <SignIn />
        </Box>
        <Date />
        <TodoInput />
        <TodosList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
