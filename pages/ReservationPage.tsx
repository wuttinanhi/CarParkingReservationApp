import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {LogoutButton} from '../components/LogoutButton';
import {defaultStyles} from '../styles/default.style';

export const ReservationPage = () => {
  return (
    <View style={defaultStyles.main}>
      <Text variant="titleLarge">Reservation Page</Text>
      <View style={defaultStyles.mt50}>
        <LogoutButton />
      </View>
    </View>
  );
};
