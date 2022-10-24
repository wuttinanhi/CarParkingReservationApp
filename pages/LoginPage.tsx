import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

export const LoginPage = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Text variant="titleLarge">Login</Text>
      <TextInput label="Email" mode="outlined" />
      <TextInput label="Password" mode="outlined" secureTextEntry={true} />
      <Button mode="contained">Login</Button>

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Index');
        }}>
        Test
      </Button>
    </View>
  );
};
