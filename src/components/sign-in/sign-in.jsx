import React, { useState } from 'react';
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
  Text,
  Box,
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

const PasswordInput = ({ id, name, placeholder }) => {
  const [show, setShow] = useState(false);
  const clickHandler = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Field
        as={Input}
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
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
  const [isSignUpForm, setIsSignUpForm] = useState(false);

  const formTypeChangeHandler = () => setIsSignUpForm(!isSignUpForm);

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
                name: '',
                email: '',
                password: '',
                passconf: '',
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('Name is a required field'),
                email: Yup.string()
                  .email()
                  .required('Email is a required field'),
                password: Yup.string().required('Password is a required field'),
                passconf: Yup.string().oneOf(
                  [Yup.ref('password'), null],
                  'Passwords must match'
                ),
              })}
              onSubmit={submitHandler}
            >
              {({ handleSubmit, errors, touched }) => (
                <form id="login" onSubmit={handleSubmit}>
                  <Stack spacing="3">
                    {isSignUpForm ? (
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Name"
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    ) : null}
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
                      <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    {isSignUpForm ? (
                      <FormControl
                        isInvalid={!!errors.passconf && touched.passconf}
                      >
                        <PasswordInput
                          id="passconf"
                          name="passconf"
                          placeholder="Password again"
                        />
                        <FormErrorMessage>{errors.passconf}</FormErrorMessage>
                      </FormControl>
                    ) : null}
                  </Stack>
                </form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            {isSignUpForm ? (
              <Box>
                <Text as="span" mr="1">
                  Already have an account?
                </Text>
                <Button variant="link" onClick={formTypeChangeHandler}>
                  Sign In
                </Button>
              </Box>
            ) : (
              <Box>
                <Text as="span" mr="1">
                  Don't have an account?
                </Text>
                <Button variant="link" onClick={formTypeChangeHandler}>
                  Sign Up
                </Button>
              </Box>
            )}
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
