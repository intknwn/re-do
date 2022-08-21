import React, { useState } from 'react';

import {
  Stack,
  InputGroup,
  Input,
  InputRightElement,
  Kbd,
  IconButton,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

const TodoInput = () => {
  const [todoText, setTodoText] = useState('');

  const onChangeHandler = e => setTodoText(e.target.value);

  return (
    <Stack
      direction="row"
      alignItems="center"
      borderRadius="10"
      padding="3"
      mb="7"
      bg="gray.100"
    >
      <InputGroup size="md">
        <Input
          placeholder="What needs to be done?"
          bg="white"
          value={todoText}
          onChange={onChangeHandler}
        />
        <InputRightElement w="16">
          <Kbd size="xs" opacity="0.5">
            enter
          </Kbd>
        </InputRightElement>
      </InputGroup>
      <IconButton size="sm" icon={<AddIcon />} />
    </Stack>
  );
};

export default TodoInput;
