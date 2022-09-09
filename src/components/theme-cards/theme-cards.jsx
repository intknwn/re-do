import { useState } from 'react';

import { useRadioGroup, theme, Button, Flex } from '@chakra-ui/react';

import ThemeCard from '../theme-card/theme-card';

import { capitalize } from '../../helpers';

const ThemeCards = ({ currentTheme, changeHandler }) => {
  const [isAllShown, setIsAllShown] = useState(false);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'theme',
    defaultValue: currentTheme,
    onChange: changeHandler,
  });

  const showAllHandler = () => setIsAllShown(!isAllShown);

  const group = getRootProps();

  const createThemeCards = () => {
    const cards = Object.entries(theme.colors)
      .map(([themeName, color]) => {
        if (color[500] && !themeName.includes('Alpha')) {
          const radio = getRadioProps({ value: themeName });

          return (
            <ThemeCard key={themeName} bgColor={color[500]} {...radio}>
              {capitalize(themeName)}
            </ThemeCard>
          );
        }

        return null;
      })
      .filter(x => x);

    return isAllShown ? cards : cards.slice(0, 4);
  };

  return (
    <Flex direction="column">
      <Flex
        direction="row"
        justifyContent="center"
        wrap="wrap"
        gap="3"
        {...group}
      >
        {createThemeCards()}
      </Flex>
      <Button
        variant="link"
        alignSelf="flex-end"
        mt="2"
        mr="2"
        onClick={showAllHandler}
      >
        {isAllShown ? 'Hide' : 'Show All'}
      </Button>
    </Flex>
  );
};

export default ThemeCards;
