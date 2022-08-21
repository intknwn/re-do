import React from 'react';

import {
  Stack,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from '@chakra-ui/react';

import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';

import { Colors } from '../../config';

const Filters = () => (
  <Stack direction="row" justifyContent="start" mb="2">
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<FiFilter />}
        size="sm"
        w="8"
        variant="outline"
      />
      <MenuList zIndex="10">
        <MenuOptionGroup defaultValue="all" title="Status" type="radio">
          <MenuItemOption value="all">All</MenuItemOption>
          <MenuItemOption value="active">Active</MenuItemOption>
          <MenuItemOption value="completed">Completed</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Label" type="checkbox">
          {Object.values(Colors).map(color => (
            <MenuItemOption key={color} value={color}>
              <Box w={4} h={4} bg={color} />
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<BiSort />}
        size="sm"
        w="8"
        variant="outline"
      />
      <MenuList zIndex="10">
        <MenuOptionGroup title="Status" type="radio">
          <MenuItemOption value="all">Completed</MenuItemOption>
          <MenuItemOption value="active">Active</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Date" type="radio">
          <MenuItemOption value="newer">Newer</MenuItemOption>
          <MenuItemOption value="older">Older</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  </Stack>
);

export default Filters;
