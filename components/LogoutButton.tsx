import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Button} from 'react-native-paper';
import {AuthService} from '../libs/auth.service';

export const LogoutButton = () => {
  const nagivation = useNavigation<any>();

  async function doLogout() {
    await AuthService.removeAccessToken();
    nagivation.navigate('LoginPage');
  }

  return (
    <Button mode="contained" onPress={doLogout}>
      Logout
    </Button>
  );
};
