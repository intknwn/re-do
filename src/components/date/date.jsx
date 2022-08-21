import React from 'react';
import { Text } from '@chakra-ui/react';

import { getDayOfTheWeek, getDayOfTheMonth, getMonth } from '../../helpers';

export const Date = () => (
  <>
    <Text fontSize="5xl" fontWeight="bold" lineHeight="10" color="blue.500">
      {getDayOfTheWeek()}
    </Text>
    <Text fontSize="2xl" mb="5">
      {getMonth()}, {getDayOfTheMonth()}
    </Text>
  </>
);

export default Date;
