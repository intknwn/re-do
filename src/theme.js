import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          bg: 'white',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'blue',
  })
);
