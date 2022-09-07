import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useDisclosure,
  useToast,
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
  Stack,
  FormControl,
  FormErrorMessage,
  Text,
  Box,
} from '@chakra-ui/react';

import PasswordInput from '../password-input/password-input';

import { RiLoginBoxFill } from 'react-icons/ri';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { createUser } from '../../firebase/functions';

import {
  userAuthStatusChanged,
  userDetailsAdded,
} from '../../features/user/userSlice';

import {
  selectTodos,
  todoAddedAsync,
  getTodos,
  todoReset,
} from '../../features/todos/todosSlice';

import { delay } from '../../helpers';

const signUpSchema = Yup.object({
  name: Yup.string().required('Name is a required field'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  password: Yup.string().required('Password is a required field'),
  passconf: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const signInSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  password: Yup.string().required('Password is a required field'),
});

const signUpInitialValues = {
  name: '',
  email: '',
  password: '',
  passconf: '',
};

const signInInitialValues = {
  email: '',
  password: '',
};

const toastConfig = {
  status: 'success',
  position: 'top',
  duration: 3000,
  isClosable: true,
};

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [isPassHidden, setIsPassHidden] = useState(true);
  const toast = useToast();
  const todos = useSelector(selectTodos);

  const formTypeChangeHandler = () => setIsSignUpForm(!isSignUpForm);
  const showPasswordHandler = () => setIsPassHidden(!isPassHidden);

  const signInHandler = async ({ email, password }, { setFieldError }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      toast({
        title: 'Successfully logged in!',
        ...toastConfig,
      });

      dispatch(userAuthStatusChanged(true));
      dispatch(userDetailsAdded({ uid: user.uid, email: user.email }));

      if (todos.length > 0) {
        todos.forEach(todo => dispatch(todoAddedAsync(todo)));
        dispatch(todoReset());
      }

      dispatch(getTodos(user.uid));
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        setFieldError('email', `Email is incorrect or doesn't exist`);
        return;
      }

      if (e.code === 'auth/wrong-password') {
        setFieldError('password', `The password is incorrect`);
        return;
      }

      throw e;
    }
  };

  const signUpHandler = async (
    { name, email, password },
    { setFieldError }
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast({
        title: 'Success!',
        description: "We've created an account for you.",
        ...toastConfig,
      });

      createUser(user.uid, name);
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setFieldError('email', `User with this email already exists`);
        return;
      }

      throw e;
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

        <Formik
          initialValues={
            isSignUpForm ? signUpInitialValues : signInInitialValues
          }
          validationSchema={isSignUpForm ? signUpSchema : signInSchema}
          onSubmit={isSignUpForm ? signUpHandler : signInHandler}
        >
          {({ handleSubmit, handleBlur, errors, touched, isSubmitting }) => (
            <ModalContent>
              <ModalHeader>{isSignUpForm ? 'Sign Up' : 'Log In'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form id="login" onSubmit={handleSubmit}>
                  <Stack spacing="3">
                    {isSignUpForm ? (
                      <FormControl
                        isInvalid={!!errors.name && touched.name}
                        isDisabled={isSubmitting}
                      >
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Name"
                          onBlur={delay(handleBlur, 300)}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    ) : null}
                    <FormControl
                      isInvalid={!!errors.email && touched.email}
                      isDisabled={isSubmitting}
                    >
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onBlur={delay(handleBlur, 300)}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                      isDisabled={isSubmitting}
                    >
                      <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Password"
                        isPassHidden={isPassHidden}
                        clickHandler={showPasswordHandler}
                        blurHandler={handleBlur}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    {isSignUpForm ? (
                      <FormControl
                        isInvalid={!!errors.passconf && touched.passconf}
                        isDisabled={isSubmitting}
                      >
                        <PasswordInput
                          id="passconf"
                          name="passconf"
                          placeholder="Password again"
                          isPassHidden={isPassHidden}
                          clickHandler={showPasswordHandler}
                          blurHandler={handleBlur}
                          noControls
                        />
                        <FormErrorMessage>{errors.passconf}</FormErrorMessage>
                      </FormControl>
                    ) : null}
                  </Stack>
                </form>
              </ModalBody>
              <ModalFooter justifyContent="space-between">
                <Box>
                  <Text as="span" mr="1">
                    {isSignUpForm
                      ? 'Already have an account?'
                      : "Don't have an account?"}
                  </Text>
                  <Button
                    variant="link"
                    onClick={formTypeChangeHandler}
                    disabled={isSubmitting}
                  >
                    {isSignUpForm ? 'Log In' : 'Sign Up'}
                  </Button>
                </Box>
                <Button form="login" size="md" type="submit">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default SignIn;
