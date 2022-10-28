import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native-paper';

export const GoToInvoicePageButton = () => {
  const navigation = useNavigation<any>();

  function gotoInvoicePage() {
    navigation.navigate('InvoicePage');
  }

  return (
    <Button mode="contained" onPress={gotoInvoicePage}>
      Invoice Page
    </Button>
  );
};
