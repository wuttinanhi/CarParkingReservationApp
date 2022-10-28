import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Card} from 'react-native-paper';
import {IInvoiceRecord} from '../libs/payment.service';
import {defaultStyles} from '../styles/default.style';

export interface IInvoiceCardProps {
  invoice: IInvoiceRecord;
}

export const InvoiceCard = (props: IInvoiceCardProps) => {
  const navigation = useNavigation<any>();

  function gotoInvoiceCheckoutPage() {
    navigation.navigate('InvoiceCheckoutPage');
  }

  return (
    <Card style={defaultStyles.mt05}>
      <Card.Title
        title={`Invoice #${props.invoice.invoice_id}`}
        subtitle={`Reservation #${props.invoice.invoice_reservation_id}`}
        titleVariant="titleLarge"
      />
      <Card.Actions>
        <Button mode="text">{props.invoice.invoice_status}</Button>
        <Button mode="contained" onPress={gotoInvoiceCheckoutPage}>
          Pay
        </Button>
      </Card.Actions>
    </Card>
  );
};
