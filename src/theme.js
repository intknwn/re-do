import {
  theme as defaultTheme,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

console.dir(defaultTheme.components);

export const theme = extendTheme(
  {
    components: {
      Stack: {
        baseStyle: props => ({
          bg: mode('gray.50', 'transparent')(props),
          border: mode(`1px solid ${props.theme.colors.gray[50]}`, 'none'),
        }),
      },
      Input: {
        baseStyle: props => ({
          field: {
            bg: mode('white', 'transparent')(props),
          },
        }),
        variants: {
          outline: props => ({
            field: {
              ...defaultTheme.components.Input.variants.outline(props).field,
              bg: mode('white', 'transparent')(props),
            },
          }),
        },
        defaultProps: {
          variant: 'outline',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'blue',
  })
);

console.dir(theme);
