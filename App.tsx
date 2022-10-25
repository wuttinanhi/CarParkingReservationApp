/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {ChatPage} from './pages/ChatPage';
import {DefaultIndexPage} from './pages/DefaultIndexPage';
import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import {ReservationPage} from './pages/ReservationPage';
import {SearchPage} from './pages/SearchPage';
import {UserPage} from './pages/UserPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />

          <Stack.Screen name="ReservationPage" component={ReservationPage} />
          <Stack.Screen name="ChatPage" component={ChatPage} />
          <Stack.Screen name="SearchPage" component={SearchPage} />
          <Stack.Screen name="UserPage" component={UserPage} />

          <Stack.Screen name="Index" component={DefaultIndexPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

export default App;
