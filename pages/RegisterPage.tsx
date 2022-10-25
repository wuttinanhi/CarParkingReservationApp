import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {AuthService} from '../libs/auth.service';

export interface IAuthRegister {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  phone_number: string;
}

export const RegisterPage = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  async function doRegister() {
    await AuthService.register({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      username: username,
      phone_number: phoneNumber,
    });

    navigation.navigate('ReservationPage');
  }

  async function gotoLoginPage() {
    navigation.navigate('LoginPage');
  }

  return (
    <View style={styles.main}>
      <Text variant="titleLarge" style={styles.textCenter}>
        Register
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
        <TextInput
          label="Username"
          mode="outlined"
          onChangeText={text => setUsername(text)}
          style={styles.spaceTop}
        />
        <TextInput
          label="Firstname"
          mode="outlined"
          onChangeText={text => setFirstname(text)}
          style={styles.spaceTop}
        />
        <TextInput
          label="Lastname"
          mode="outlined"
          onChangeText={text => setLastname(text)}
          style={styles.spaceTop}
        />
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={text => setPhoneNumber(text)}
          style={styles.spaceTop}
        />
      </View>

      <Button mode="contained" onPress={doRegister} style={styles.spaceTop}>
        Register
      </Button>

      <Button mode="text" onPress={gotoLoginPage} style={styles.spaceTop}>
        Login
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
