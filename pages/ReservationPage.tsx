import React from 'react';
import {ScrollView, View} from 'react-native';
import {HeaderBanner} from '../components/HeaderBanner';
import {ReservationRecord} from '../components/ReservationRecord';
import {
  IReservationRecord,
  ReservationService,
} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export const ReservationPage = () => {
  const [reservationData, setReservationData] = React.useState<
    IReservationRecord[]
  >([]);

  async function load() {
    const res = await ReservationService.listReservation({
      limit: 10,
      order_by: 'id',
      page: 1,
      sort: 0,
    });

    setReservationData(res);
  }

  function renderReservationData() {
    return reservationData.map((v, i) => (
      <ReservationRecord key={i} reservation={v} />
    ));
  }

  React.useEffect(() => {
    load();
  }, []);

  if (!reservationData) {
    return null;
  }

  return (
    <>
      <View style={defaultStyles.main}>
        <HeaderBanner headerText="Reservation" />
        <ScrollView>{renderReservationData()}</ScrollView>
      </View>
    </>
  );
};
