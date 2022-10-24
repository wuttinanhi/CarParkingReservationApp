import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {AuthService} from '../libs/auth.service';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState('');

  async function doLogin() {
    const token = await AuthService.login(email, password);

    if (token) {
      await AuthService.getUser();
      const uinfo = await AuthService.getUser();
      setUserInfo(JSON.stringify(uinfo));
    }
  }

  return (
    <View style={styles.main}>
      <Text variant="titleLarge" style={styles.textCenter}>
        Login
      </Text>

      <View style={styles.body}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <Button mode="contained" onPress={doLogin}>
        Login
      </Button>

      <Text style={styles.mt} variant="bodyLarge">
        {userInfo}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {textAlign: 'center'},
  main: {marginTop: '50%', paddingHorizontal: '5%'},
  body: {marginVertical: '10%'},
  mt: {marginTop: '20%'},
});
