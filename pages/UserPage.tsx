import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {GoToInvoicePageButton} from '../components/GoToInvoiceButton';
import {LogoutButton} from '../components/LogoutButton';
import {defaultStyles} from '../styles/default.style';

export const UserPage = () => {
  return (
    <>
      <View style={defaultStyles.main}>
        <Text variant="titleLarge">User</Text>

        <View style={defaultStyles.mt10}>
          <GoToInvoicePageButton />
        </View>
        <View style={defaultStyles.mt10}>
          <LogoutButton />
        </View>
      </View>
    </>
  );
};
