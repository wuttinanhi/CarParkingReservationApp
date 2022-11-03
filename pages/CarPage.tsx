import React from 'react';
import {View} from 'react-native';
import {HeaderBanner} from '../components/HeaderBanner';
import {defaultStyles} from '../styles/default.style';

export const CarPage = () => {
  return (
    <View style={defaultStyles.main}>
      <HeaderBanner headerText="Car" />
    </View>
  );
};
