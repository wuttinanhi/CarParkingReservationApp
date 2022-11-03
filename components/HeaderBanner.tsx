import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const styles = StyleSheet.create({
  default: {
    marginVertical: '10%',
  },
});

export interface HeaderBannerProps {
  headerText: string;
}

export function HeaderBanner({headerText}: HeaderBannerProps) {
  return (
    <Text variant="displayMedium" style={styles.default}>
      {headerText}
    </Text>
  );
}
