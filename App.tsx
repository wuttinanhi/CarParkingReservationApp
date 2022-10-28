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
import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {PaymentService} from './libs/payment.service';
import {ChatPage} from './pages/ChatPage';
import {DefaultIndexPage} from './pages/DefaultIndexPage';
import {InvoiceCheckoutPage} from './pages/InvoiceCheckoutPage';
import {InvoicePage} from './pages/InvoicePage';
import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import {ReservationPage} from './pages/ReservationPage';
import {SearchPage} from './pages/SearchPage';
import {UserPage} from './pages/UserPage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [stripePublicKey, setStripePublicKey] = useState('');

  async function fetchStripePublicKey() {
    const pk = await PaymentService.getStripePublicKey();
    setStripePublicKey(pk);
  }

  useEffect(() => {
    fetchStripePublicKey();
  }, []);

  if (stripePublicKey === '') {
    return null;
  }

  return (
    <StripeProvider publishableKey={stripePublicKey}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />

            <Stack.Screen name="ReservationPage" component={ReservationPage} />
            <Stack.Screen name="ChatPage" component={ChatPage} />
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="UserPage" component={UserPage} />

            <Stack.Screen name="InvoicePage" component={InvoicePage} />
            <Stack.Screen
              name="InvoiceCheckoutPage"
              component={InvoiceCheckoutPage}
            />

            <Stack.Screen name="Index" component={DefaultIndexPage} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </StripeProvider>
  );
};

export default App;
