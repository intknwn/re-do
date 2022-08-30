import { useDispatch } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import {
  userAuthStatusChanged,
  userDetailsAdded,
} from '../../features/user/userSlice';

const SignOut = () => {
  const dispatch = useDispatch();

  const signOutHandler = async () => {
    try {
      await signOut(auth);

      dispatch(userAuthStatusChanged(false));
      dispatch(userDetailsAdded(null));
    } catch (e) {
      console.log(e);
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
