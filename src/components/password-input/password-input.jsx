import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { Field } from 'formik';

import { delay } from '../../helpers';

const PasswordInput = ({
  id,
  name,
  placeholder,
  isPassHidden,
  clickHandler,
  blurHandler,
  noControls,
}) => {
  return (
    <InputGroup size="md">
      <Field
        as={Input}
        id={id}
        name={name}
        type={isPassHidden ? 'password' : 'text'}
        placeholder={placeholder}
        pr="4"
        onBlur={delay(blurHandler, 300)}
      />
      <InputRightElement width="14">
        {noControls ? null : (
          <Button h="8" w="12" size="xs" onClick={clickHandler}>
            {isPassHidden ? 'Show' : 'Hide'}
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
