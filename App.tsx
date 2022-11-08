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
import {CarPage} from './pages/CarPage';
import {ChatListPage} from './pages/ChatListPage';
import {ChatPage} from './pages/ChatPage';
import {CreateReservationPage} from './pages/CreateReservationPage';
import {IndexPage} from './pages/IndexPage';
import {InvoiceCheckoutPage} from './pages/InvoiceCheckoutPage';
import {InvoicePage} from './pages/InvoicePage';
import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import {UserPage} from './pages/UserPage';
import {UserProfile} from './pages/UserProfile';

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
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{animation: 'none'}}
            />

            <Stack.Screen
              name="ReservationPage"
              component={IndexPage}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name="ChatListPage"
              component={ChatListPage}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name="CarPage"
              component={CarPage}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name="UserPage"
              component={UserPage}
              options={{animation: 'none'}}
            />

            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={{animation: 'none'}}
            />

            <Stack.Screen
              name="InvoicePage"
              component={InvoicePage}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name="InvoiceCheckoutPage"
              component={InvoiceCheckoutPage}
              options={{animation: 'none'}}
            />

            <Stack.Screen
              name="CreateReservationPage"
              component={CreateReservationPage}
              options={{animation: 'none'}}
            />

            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{animation: 'none'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </StripeProvider>
  );
};

export default App;
