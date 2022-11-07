import React from 'react';
import {ScrollView, View} from 'react-native';
import {CarCard} from '../components/CarCard';
import {HeaderBanner} from '../components/HeaderBanner';
import {CarService, ICarRecord} from '../libs/car.service';
import {defaultStyles} from '../styles/default.style';

export const CarPage = () => {
  const [invoiceList, setInvoiceList] = React.useState<ICarRecord[]>([]);

  async function loadData() {
    const result = await CarService.listCar({
      limit: 5,
      order_by: 'id',
      page: 1,
      sort: 1,
    });

    setInvoiceList(result);
  }

  React.useEffect(() => {
    loadData();
  }, []);

  function renderRecord(v: ICarRecord, i: number) {
    return <CarCard key={i} car={v} />;
  }

  return (
    <View style={defaultStyles.main}>
      <HeaderBanner headerText="Car" />
      <ScrollView>
        {invoiceList.map((v: any, i: any) => renderRecord(v, i))}
      </ScrollView>
    </View>
  );
};
