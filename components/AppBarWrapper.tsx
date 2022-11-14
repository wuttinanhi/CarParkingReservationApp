import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export interface AppBarWrapperProps {
  title: string;
}
export function AppBarWrapper({title}: AppBarWrapperProps) {
  const navigation = useNavigation<any>();

  function onBackPress() {
    navigation.goBack();
  }

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => onBackPress()} />
      <Appbar.Content
        title={title}
        style={style.titleStyle}
        titleStyle={style.titleStyleInner}
      />
    </Appbar.Header>
  );
}

const style = StyleSheet.create({
  titleStyle: {
    marginLeft: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  titleStyleInner: {alignSelf: 'center'},
});
