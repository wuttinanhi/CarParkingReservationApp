import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {HeaderBanner} from '../components/HeaderBanner';
import {InvoiceCard} from '../components/InvoiceCard';
import {IInvoiceRecord, PaymentService} from '../libs/payment.service';
import {defaultStyles} from '../styles/default.style';

export const InvoicePage = () => {
  const route = useRoute();
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
      sort: 1,
    });

    setInvoiceList(list);
  }

  useEffect(() => {
    fetchPaymentInvoice();

    const intervalHandler = setInterval(() => {
      fetchPaymentInvoice();
    }, 2000);

    return () => {
      clearInterval(intervalHandler);
    };
  }, []);

  useEffect(() => {
    fetchPaymentInvoice();
  }, [route]);

  return (
    <ScrollView style={defaultStyles.main}>
      <HeaderBanner headerText="Invoice:" />

      <View style={defaultStyles.mt10}>{renderInvoiceCard(invoiceList)}</View>
    </ScrollView>
  );
};
