import React from 'react';

import { useDispatch } from 'react-redux';

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
import { capitalize } from '../../helpers';

import {
  StatusFilters,
  statusChanged,
  colorChanged,
} from '../../features/filters/filtersSlice';

import {
  statusSortingChanged,
  StatusSorting,
} from '../../features/sorting/sortingSlice';

const Filters = () => {
  const dispatch = useDispatch();

  const filterOptions = Object.values(StatusFilters).map(statusFilter => (
    <MenuItemOption key={statusFilter} value={statusFilter}>
      {capitalize(statusFilter)}
    </MenuItemOption>
  ));

  const sortingOptions = Object.values(StatusSorting).map(statusSorting => {
    const capitalized = capitalize(statusSorting);

    return (
      <MenuItemOption key={statusSorting} value={statusSorting}>
        {statusSorting !== StatusSorting.ORIGINAL
          ? `${capitalized} First`
          : capitalized}
      </MenuItemOption>
    );
  });

  const statusChangeHadler = status => dispatch(statusChanged(status));
  const colorChangeHandler = colors => dispatch(colorChanged(colors));
  const statusSortingChangeHandler = status =>
    dispatch(statusSortingChanged(status));

  return (
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
          <MenuOptionGroup
            defaultValue="all"
            title="Status"
            type="radio"
            onChange={statusChangeHadler}
          >
            {filterOptions}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup
            title="Label"
            type="checkbox"
            onChange={colorChangeHandler}
          >
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
          <MenuOptionGroup
            title="Order"
            type="radio"
            onChange={statusSortingChangeHandler}
            defaultValue={StatusSorting.NONE}
          >
            {sortingOptions}
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
};

export default Filters;
