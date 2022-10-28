import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {InvoiceCard} from '../components/InvoiceCard';
import {IInvoiceRecord, PaymentService} from '../libs/payment.service';
import {defaultStyles} from '../styles/default.style';

export const InvoicePage = () => {
  const [invoiceList, setInvoiceList] = useState<IInvoiceRecord[]>([]);

  function renderInvoiceCard(list: IInvoiceRecord[]) {
    const result = [];
    for (const invoice of list) {
      result.push(<InvoiceCard invoice={invoice} key={invoice.invoice_id} />);
    }
    return result;
  }

  async function fetchPaymentInvoice() {
    const list = await PaymentService.listInvoice({
      limit: 10,
      order_by: 'id',
      page: 1,
      sort: 0,
    });

    setInvoiceList(list);
  }

  useEffect(() => {
    fetchPaymentInvoice();
    PaymentService.getStripePublicKey();
  }, []);

  return (
    <ScrollView style={defaultStyles.main}>
      <Text variant="titleLarge" style={defaultStyles.mt10}>
        Invoice:
      </Text>

      <View style={defaultStyles.mt10}>{renderInvoiceCard(invoiceList)}</View>
    </ScrollView>
  );
};