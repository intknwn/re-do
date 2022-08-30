import React from 'react';
import { useDispatch } from 'react-redux';

import {
  useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { RiLoginBoxFill } from 'react-icons/ri';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

import {
  userAuthStatusChanged,
  userDetailsAdded,
} from '../../features/user/userSlice';

const PasswordInput = () => {
  const [show, setShow] = React.useState(false);
  const clickHandler = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Field
        as={Input}
        id="password"
        name="password"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        pr="4"
      />
      <InputRightElement width="14">
        <Button h="8" w="12" size="xs" onClick={clickHandler}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const submitHandler = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(userAuthStatusChanged(true));
      dispatch(userDetailsAdded({ email: userCredential.user.email }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <IconButton
        aria-label="Sign In"
        variant="ghost"
        fontSize="20"
        icon={<RiLoginBoxFill />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
                // .min(8, 'Password is too short - should be 8 chars minimum.')
              })}
              onSubmit={submitHandler}
            >
              {({ handleSubmit, errors, touched }) => (
                <form id="login" onSubmit={handleSubmit}>
                  <Stack spacing="3">
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <PasswordInput />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  </Stack>
                </form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button form="login" size="md" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
