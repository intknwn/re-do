import React from 'react';

import {
  InputGroup,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  IconButton,
  ListItem,
  Button,
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

function EditableControls({ labelColor }) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  const { onOpen } = useDisclosure();

  return isEditing ? (
    <>
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
              backgroundColor: labelColor,
              backgroundClip: 'content-box',
            }}
            _active={{ backgroundColor: labelColor }}
            _hover={{ backgroundColor: labelColor }}
            onClick={onOpen}
          />
          <MenuList minW="0" w="8">
            {Object.values(Colors).map(color => (
              <MenuItem
                key={color}
                value={color}
                w="8"
                p="1"
                justifyContent="center"
              >
                <Box as="span" w={5} h={5} bg={color} />
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    </>
  ) : (
    <ButtonGroup size="sm">
      <IconButton icon={<EditIcon />} {...getEditButtonProps()} />
      <IconButton icon={<DeleteIcon />} />
    </ButtonGroup>
  );
}

export const TodoItem = ({ todo }) => (
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
      bg={todo.color}
      borderLeftRadius="10px"
    />
    <Editable defaultValue={todo.text} h="100%">
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
          />
        ) : (
          <Button
            size="sm"
            mr="4"
            borderWidth="3px"
            borderRadius="50%"
            variant="outline"
          />
        )}
        <EditablePreview w="60%" />
        <EditableInput w="60%" padding="2" variant="unstyled" />
        <EditableControls labelColor={todo.color} />
      </InputGroup>
    </Editable>
  </ListItem>
);

export default TodoItem;
