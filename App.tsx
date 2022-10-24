/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button, Provider as PaperProvider} from 'react-native-paper';

import BottomNavbar from './components/BottomNavbar';
import {LoginPage} from './pages/LoginPage';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  bgOrange: {backgroundColor: 'orange'},
});

function DefaultIndexPage({navigation}: {navigation: any}) {
  return (
    <>
      <LoginPage />
      <View style={styles.bgOrange}>
        <Text>Test</Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Login Page
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            console.log(navigation);
          }}>
          DEV
        </Button>
      </View>
      <BottomNavbar />
    </>
  );
}

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Index" component={DefaultIndexPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

export default App;
