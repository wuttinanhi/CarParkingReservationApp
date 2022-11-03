import React from 'react';
import {View} from 'react-native';
import {GoToInvoicePageButton} from '../components/GoToInvoiceButton';
import {HeaderBanner} from '../components/HeaderBanner';
import {LogoutButton} from '../components/LogoutButton';
import {defaultStyles} from '../styles/default.style';

export const UserPage = () => {
  return (
    <>
      <View style={defaultStyles.main}>
        <HeaderBanner headerText="Car" />

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
