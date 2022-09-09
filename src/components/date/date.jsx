import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import { selectColorTheme } from '../../features/user/userSlice';

import { getDayOfTheWeek, getDayOfTheMonth, getMonth } from '../../helpers';

export const Date = () => {
  const color = useSelector(selectColorTheme);

  return (
    <>
      <Text
        fontSize="5xl"
        fontWeight="bold"
        lineHeight="10"
        color={`${color}.500`}
      >
        {getDayOfTheWeek()}
      </Text>
      <Text fontSize="2xl" mb="5">
        {getMonth()}, {getDayOfTheMonth()}
      </Text>
    </>
  );
};

export default Date;
