import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

import { todoAdded } from '../../features/todos/todosSlice';

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const onChangeHandler = e => setInputValue(e.target.value);

  const keyDownHandler = e => {
    const value = e.target.value.trim();

    if (value && e.key === 'Enter') {
      dispatch(todoAdded(value));

      setInputValue('');
    }
  };

  const addTodoHandler = () => {
    dispatch(todoAdded(inputValue));

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
