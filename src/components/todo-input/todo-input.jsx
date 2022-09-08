import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorModeValue } from '@chakra-ui/react';

import {
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  IconButton,
} from '@chakra-ui/react';

import Stack from '../styled/Stack';

import { AddIcon } from '@chakra-ui/icons';

import {
  todoAddedLocally,
  todoAddedAsync,
} from '../../features/todos/todosSlice';
import { selectUserAuthStatus } from '../../features/user/userSlice';

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(selectUserAuthStatus);

  const onChangeHandler = e => setInputValue(e.target.value);
  const dispatchAction = auth
    ? text => dispatch(todoAddedAsync({ text }))
    : text => dispatch(todoAddedLocally(text));

  const keyDownHandler = e => {
    const value = e.target.value.trim();

    if (value && e.key === 'Enter') {
      dispatchAction(value);

      setInputValue('');
    }
  };

  const addTodoHandler = () => {
    dispatchAction(inputValue);

    setInputValue('');
  };

  const inputVariant = useColorModeValue('outline', 'flushed');

  return (
    <Stack
      direction="row"
      alignItems="center"
      borderRadius="10"
      padding="3"
      mb="7"
      gap="2"
    >
      <InputGroup size="md">
        <Input
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={onChangeHandler}
          onKeyDown={keyDownHandler}
          variant={inputVariant}
        />
        <InputRightElement w="16">
          <Kbd size="xs" opacity="0.5">
            enter
          </Kbd>
        </InputRightElement>
      </InputGroup>
      <IconButton size="sm" icon={<AddIcon />} onClick={addTodoHandler} />
    </Stack>
  );
};

export default TodoInput;
