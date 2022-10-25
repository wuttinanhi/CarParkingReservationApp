import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {AuthService} from '../libs/auth.service';

export const LoginPage = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function doLogin() {
    const token = await AuthService.login(email, password);

    if (token) {
      await AuthService.setAccessToken(token);
      navigation.navigate('ReservationPage');
    }
  }

  async function gotoRegisterPage() {
    navigation.navigate('RegisterPage');
  }

  return (
    <View style={styles.main}>
      <Text variant="titleLarge" style={styles.textCenter}>
        Welcome to Car Parking Reservation
      </Text>

      <View style={styles.body}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={text => setEmail(text)}
          style={styles.spaceTop}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.spaceTop}
        />
      </View>

      <Button mode="contained" onPress={doLogin} style={styles.spaceTop}>
        Login
      </Button>

      <Button mode="text" onPress={gotoRegisterPage} style={styles.spaceTop}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {textAlign: 'center'},
  main: {marginTop: '50%', paddingHorizontal: '5%'},
  body: {marginVertical: '10%'},
  spaceTop: {marginTop: '20%'},
  mt: {marginTop: '20%'},
});
