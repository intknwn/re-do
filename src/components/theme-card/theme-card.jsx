import { useRadio, Box } from '@chakra-ui/react';

const ThemeCard = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" width="45%" h="20">
      <input {...input} />
      <Box
        {...checkbox}
        w="100%"
        h="100%"
        fontSize="sm"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color="white"
        bg={props.bgColor}
        _focus={{
          boxShadow: 'outline',
        }}
        _checked={{
          boxShadow: 'outline',
        }}
        px={4}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default ThemeCard;
