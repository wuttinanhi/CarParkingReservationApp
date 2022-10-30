import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {defaultStyles} from '../styles/default.style';

export const ReservationPage = () => {
  return (
    <>
      <View style={defaultStyles.main}>
        <Text variant="titleLarge">Reservation</Text>
      </View>
    </>
  );
};
