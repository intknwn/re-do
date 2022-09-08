import { useDispatch } from 'react-redux';
import { useToast, IconButton } from '@chakra-ui/react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import {
  userAuthStatusChanged,
  userDetailsAdded,
} from '../../features/user/userSlice';
import { todoReset } from '../../features/todos/todosSlice';
import { persistor } from '../../store';

const toastConfig = {
  position: 'top',
  duration: 3000,
  isClosable: true,
};

const SignOut = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const signOutHandler = async () => {
    try {
      await signOut(auth);

      toast({
        title: 'Successfully logged out!',
        status: 'success',
        ...toastConfig,
      });

      dispatch(userAuthStatusChanged(false));
      dispatch(userDetailsAdded(null));
      dispatch(todoReset());
      persistor.purge();
    } catch (e) {
      toast({
        title: 'Something went wrong...',
        description: e.code,
        status: 'error',
        ...toastConfig,
      });
    }
  };

  return (
    <IconButton
      aria-label="Sign Out"
      variant="ghost"
      fontSize="20"
      icon={<RiLogoutBoxFill />}
      onClick={signOutHandler}
    />
  );
};

export default SignOut;
