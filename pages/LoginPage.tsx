import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {createErrorText} from '../components/ErrorText';

import {
  AuthBadRequestError,
  AuthError,
  AuthService,
  IAuthLogin,
} from '../libs/auth.service';
import {defaultStyles} from '../styles/default.style';

export const LoginPage = () => {
  const navigation = useNavigation<any>();

  const [loggingIn, setLoggingIn] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);

  const [errorObject, setErrorObject] = useState<any>(null);

  async function doLogin() {
    try {
      setLoginButtonDisabled(true);
      const token = await AuthService.login({email, password});

      if (token) {
        await AuthService.setAccessToken(token);
        navigation.navigate('ReservationPage');
      }
    } catch (error) {
      if (error instanceof AuthBadRequestError) {
        const errObj = error.getErrorRecord();
        setErrorObject(errObj);

        Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
        });
      }

      if (error instanceof AuthError) {
        Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
        });
      }
    } finally {
      setLoginButtonDisabled(false);
    }
  }

  async function gotoRegisterPage() {
    navigation.navigate('RegisterPage');
  }

  async function tryLoginOnStart() {
    try {
      const savedAccessToken = await AuthService.getAccessToken();

      if (savedAccessToken) {
        setLoggingIn(true);

        const checkToken = await AuthService.checkAccessToken(savedAccessToken);

        if (!checkToken) {
          setLoggingIn(false);
          return;
        }

        navigation.navigate('ReservationPage');
      }
    } finally {
      setTimeout(() => {
        setLoggingIn(false);
      }, 1000);
    }
  }

  useEffect(() => {
    tryLoginOnStart();
  }, []);

  if (loggingIn) {
    return (
      <View style={defaultStyles.main} key="loggingIn">
        <Text
          variant="titleLarge"
          style={{...defaultStyles.textCenter, ...defaultStyles.mt20}}>
          Welcome to Car Parking Reservation
        </Text>

        <Image
          source={require('../assets/images/parking_lot.jpg')}
          style={defaultStyles.imageLarge}
        />

        <Text
          variant="titleMedium"
          style={{...defaultStyles.textCenter, ...defaultStyles.mt20}}>
          Logging you in...
        </Text>
      </View>
    );
  }

  return (
    <View style={defaultStyles.main} key="default">
      <Text
        variant="titleLarge"
        style={{...defaultStyles.textCenter, ...defaultStyles.mt20}}>
        Welcome to Car Parking Reservation
      </Text>

      <Image
        source={require('../assets/images/parking_lot.jpg')}
        style={defaultStyles.imageLarge}
      />

      <View style={defaultStyles.formBody}>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
          style={defaultStyles.formSpace}
        />
        {createErrorText<IAuthLogin>(errorObject, 'email')}

        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          style={defaultStyles.formSpace}
        />
        {createErrorText<IAuthLogin>(errorObject, 'password')}
      </View>

      <Button
        mode="contained"
        onPress={doLogin}
        disabled={loginButtonDisabled}
        style={defaultStyles.formSpace}>
        Login
      </Button>

      <Button
        mode="outlined"
        onPress={gotoRegisterPage}
        style={defaultStyles.mt05}>
        Register
      </Button>
    </View>
  );
};
