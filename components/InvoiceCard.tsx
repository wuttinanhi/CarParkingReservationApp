import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {IInvoiceRecord} from '../libs/payment.service';
import {defaultStyles} from '../styles/default.style';
export interface IInvoiceCardProps {
  invoice: IInvoiceRecord;
}

export const InvoiceCard = (props: IInvoiceCardProps) => {
  const navigation = useNavigation<any>();

  function gotoInvoiceCheckoutPage() {
    navigation.navigate('InvoiceCheckoutPage', {
      invoiceId: props.invoice.invoice_id,
    });
  }

  return (
    <Card style={defaultStyles.mb05}>
      <Card.Title
        title={`Invoice #${props.invoice.invoice_id}`}
        subtitle={`Date: ${props.invoice.invoice_create_date}`}
        titleVariant="titleLarge"
      />
      <Card.Content>
        <Text variant="bodyMedium">
          Amount: {props.invoice.invoice_charge_amount}
        </Text>
        <Text variant="bodyMedium">
          Reservation {props.invoice.invoice_reservation_id}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text">{props.invoice.invoice_status}</Button>
        <Button
          mode="contained"
          onPress={gotoInvoiceCheckoutPage}
          disabled={props.invoice.invoice_status !== 'UNPAID'}>
          Pay
        </Button>
      </Card.Actions>
    </Card>
  );
};
