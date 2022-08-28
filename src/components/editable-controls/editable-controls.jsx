import React from 'react';
import { useDispatch } from 'react-redux';
import {
  useEditableControls,
  IconButton,
  ButtonGroup,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Colors } from '../../config';
import { todoDeletedAsync } from '../../features/todos/todosSlice';

export default function EditableControls({
  todo,
  demoColor,
  demoColorChangeHandler,
}) {
  const dispatch = useDispatch();
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  const { onOpen } = useDisclosure();

  const deleteTodoHandler = () => dispatch(todoDeletedAsync(todo.id));

  const colorMenuItems = Object.values(Colors).map(color => (
    <MenuItem
      key={color}
      value={color}
      w="8"
      p="1"
      justifyContent="center"
      onClick={() => demoColorChangeHandler(color)}
    >
      <Box as="span" w={5} h={5} bg={color} />
    </MenuItem>
  ));

  return isEditing ? (
    <ButtonGroup size="sm">
      <Menu>
        <MenuButton
          {...getSubmitButtonProps()}
          as={IconButton}
          size="sm"
          w="8"
          p="1"
          variant="outline"
          sx={{
            backgroundColor: demoColor || todo.color,
            backgroundClip: 'content-box',
          }}
          _active={{ backgroundColor: demoColor || todo.color }}
          _hover={{ backgroundColor: demoColor || todo.color }}
          onClick={onOpen}
        />
        <MenuList minW="0" w="8">
          {colorMenuItems}
        </MenuList>
      </Menu>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <ButtonGroup size="sm">
      <IconButton icon={<EditIcon />} {...getEditButtonProps()} />
      <IconButton icon={<DeleteIcon />} onClick={deleteTodoHandler} />
    </ButtonGroup>
  );
}
