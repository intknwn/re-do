import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsIcon } from '@chakra-ui/icons';

import {
  useDisclosure,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import {
  colorThemeChanged,
  selectColorTheme,
} from '../../features/user/userSlice';

import ThemeCards from '../theme-cards/theme-cards';

const ThemeDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const currentTheme = useSelector(selectColorTheme);
  const themeRef = useRef({ prev: currentTheme });
  const dispatch = useDispatch();

  const themeChangeHandler = value => {
    dispatch(colorThemeChanged(value));
  };

  const cancelHandler = () => {
    dispatch(colorThemeChanged(themeRef.current.prev));
    onClose();
  };

  const saveHandler = () => {
    themeRef.current.prev = currentTheme;
    onClose();
  };

  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<SettingsIcon />}
        variant="ghost"
        onClick={onOpen}
      >
        Open
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={cancelHandler}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Theme</DrawerHeader>

          <DrawerBody>
            <ThemeCards
              currentTheme={currentTheme}
              changeHandler={themeChangeHandler}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button onClick={saveHandler}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ThemeDrawer;
