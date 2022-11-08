import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {
  AuthBadRequestError,
  AuthError,
  AuthService,
  IAuthRegister,
} from '../libs/auth.service';
import {defaultStyles} from '../styles/default.style';

export const RegisterPage = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [citizenId, setCitizenId] = useState('');

  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);

  const [errorObject, setErrorObject] = useState<any>(null);

  async function doRegister() {
    try {
      setRegisterButtonDisabled(true);

      await AuthService.register({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        username: username,
        phone_number: phoneNumber,
        citizen_id: citizenId,
      });

      Toast.show({
        type: 'success',
        text1: 'Successfully registered',
        position: 'top',
      });
      navigation.navigate('LoginPage');
    } catch (error) {
      if (error instanceof AuthBadRequestError) {
        const errObj = error.getErrorRecord();
        setErrorObject(errObj);

        return Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
        });
      }

      if (error instanceof AuthError) {
        return Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
        });
      }
    } finally {
      setRegisterButtonDisabled(false);
    }
  }

  async function gotoLoginPage() {
    navigation.navigate('LoginPage');
  }

  function createInputErrorText(key: keyof IAuthRegister) {
    if (errorObject && errorObject[key]) {
      const errorMessageValue = errorObject[key];
      return <Text style={defaultStyles.redText}>{errorMessageValue}</Text>;
    }
    return null;
  }

  return (
    <ScrollView>
      <View style={defaultStyles.main}>
        <Text
          variant="titleLarge"
          style={{...defaultStyles.textCenter, ...defaultStyles.mt10}}>
          Register
        </Text>

        <View style={defaultStyles.formBody}>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('email')}

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('password')}

          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={text => setUsername(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('username')}

          <TextInput
            label="Firstname"
            mode="outlined"
            value={firstname}
            onChangeText={text => setFirstname(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('firstname')}

          <TextInput
            label="Lastname"
            mode="outlined"
            value={lastname}
            onChangeText={text => setLastname(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('lastname')}

          <TextInput
            label="Phone Number"
            mode="outlined"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('phone_number')}

          <TextInput
            label="Citizen Id"
            mode="outlined"
            keyboardType="number-pad"
            value={citizenId}
            onChangeText={text => setCitizenId(text)}
            style={defaultStyles.formSpace}
          />
          {createInputErrorText('citizen_id')}
        </View>

        <Button
          mode="contained"
          onPress={doRegister}
          disabled={registerButtonDisabled}
          style={defaultStyles.formSpace}>
          Register
        </Button>

        <Button
          mode="outlined"
          onPress={gotoLoginPage}
          style={defaultStyles.mt05}>
          Login
        </Button>
      </View>
    </ScrollView>
  );
};
