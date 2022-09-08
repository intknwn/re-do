import React from 'react';
import { useSelector } from 'react-redux';

import Date from './components/date/date';
import TodoInput from './components/todo-input/todo-input';
import TodosList from './components/todos-list/todos-list';
import SignIn from './components/sign-in/sign-in';
import SignOut from './components/sign-out/sign-out';

import { ChakraProvider, Container, Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { theme } from './theme';

import { selectUserAuthStatus } from './features/user/userSlice';

function App() {
  const userAuthStatus = useSelector(selectUserAuthStatus);

  return (
    <ChakraProvider theme={theme}>
      <Container pt="20" pos="relative">
        <ColorModeSwitcher />
        <Box pos="absolute" right="2" top="2">
          {userAuthStatus ? <SignOut /> : <SignIn />}
        </Box>
        <Date />
        <TodoInput />
        <TodosList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
