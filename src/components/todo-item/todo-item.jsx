import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  InputGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  ListItem,
  Button,
  Box,
} from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons';
import {
  todoToggled,
  todoTextEdited,
  todoColorChanged,
} from '../../features/todos/todosSlice';

import EditableControls from '../editable-controls/editable-controls';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const [initialText, setInitialText] = useState(todo.text);
  const [text, setText] = useState(todo.text);
  const [demoColor, setDemoColor] = useState('');

  const todoTextChangeHandler = str => setText(str);

  const toggleTodoHandler = () => dispatch(todoToggled(todo.id));

  const editTodoTextHandler = () => {
    if (initialText !== text) {
      dispatch(todoTextEdited(todo.id, text));
      setInitialText(text);
    }
  };
  const todoColorChangeHandler = () => {
    if (demoColor !== todo.color) {
      dispatch(todoColorChanged(todo.id, demoColor));
    }
  };

  const submitHandler = () => {
    editTodoTextHandler();
    todoColorChangeHandler();
  };
  const resetDemoColorHandler = () => setDemoColor('');

  return (
    <ListItem
      pos="relative"
      h="16"
      py="2"
      bg="white"
      border="1px"
      borderColor="gray.200"
      borderRadius="10"
    >
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="2"
        h="100%"
        bg={demoColor || todo.color}
        borderLeftRadius="10px"
      />
      <Editable
        defaultValue={text}
        value={text}
        h="100%"
        onChange={todoTextChangeHandler}
        onSubmit={submitHandler}
        onCancel={resetDemoColorHandler}
      >
        <InputGroup
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="5"
          h="100%"
        >
          {todo.isCompleted ? (
            <IconButton
              icon={<CheckIcon />}
              size="sm"
              mr="4"
              borderRadius="50%"
              onClick={toggleTodoHandler}
            />
          ) : (
            <Button
              size="sm"
              mr="4"
              borderWidth="3px"
              borderRadius="50%"
              variant="outline"
              onClick={toggleTodoHandler}
            />
          )}
          <EditablePreview w="60%" />
          <EditableInput w="60%" padding="2" variant="unstyled" />
          <EditableControls
            todo={todo}
            demoColor={demoColor}
            demoColorChangeHandler={setDemoColor}
          />
        </InputGroup>
      </Editable>
    </ListItem>
  );
};

export default TodoItem;
