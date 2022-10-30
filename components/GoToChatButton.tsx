import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native-paper';

export const GoToChatPageButton = () => {
  const navigation = useNavigation<any>();

  function gotoChatPage() {
    navigation.navigate('ChatPage');
  }

  return (
    <Button mode="contained" onPress={gotoChatPage}>
      Chat Page
    </Button>
  );
};
