import {useNavigation, useRoute} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Screen} from 'react-native-screens';
import {PaymentService} from '../libs/payment.service';
import {defaultStyles} from '../styles/default.style';

export const InvoiceCheckoutPage = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const initializePaymentSheet = async () => {
    try {
      const invoiceId = route.params.invoiceId;
      const payResult = await PaymentService.payInvoice(invoiceId);
      const stripeClientSecret = payResult.stripe_client_secret;

      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: stripeClientSecret,
        merchantDisplayName: 'Car Parking Reservation',
        allowsDelayedPaymentMethods: true,
      });

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        navigation.navigate('InvoicePage', {
          error,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error!', error.message);
        navigation.navigate('InvoicePage', {
          error,
        });
      }
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Transaction completed.');
    }

    navigation.navigate('InvoicePage', {
      error: null,
    });
  };

  async function run() {
    await initializePaymentSheet();
    await openPaymentSheet();
  }

  useEffect(() => {
    run();
  }, []);

  return (
    <Screen>
      <View style={defaultStyles.mt20}>
        <Text variant="titleLarge" style={defaultStyles.textCenter}>
          Processing payment...
        </Text>
      </View>
    </Screen>
  );
};
