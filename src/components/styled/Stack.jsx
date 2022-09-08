import { Stack as ChakraStack, useStyleConfig } from '@chakra-ui/react';

const Stack = props => {
  const styles = useStyleConfig('Stack');

  return <ChakraStack sx={styles} {...props} />;
};

export default Stack;
