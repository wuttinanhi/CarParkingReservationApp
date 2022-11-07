import React from 'react';
import {View} from 'react-native';
import {HeaderBanner} from '../components/HeaderBanner';
import {PaginationWrapper} from '../components/PaginationWrapper';
import {ReservationRecord} from '../components/ReservationRecord';
import {
  IReservationRecord,
  ReservationService,
} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export const ReservationPage = () => {
  async function loadFunction(page: number) {
    return ReservationService.listReservation({
      limit: 5,
      order_by: 'id',
      page,
      sort: 1,
    });
  }

  function renderRecord(v: IReservationRecord, i: number) {
    return <ReservationRecord key={i} reservation={v} />;
  }

  return (
    <>
      <View style={defaultStyles.main}>
        <HeaderBanner headerText="Reservation" />
        <PaginationWrapper
          loadFunction={loadFunction}
          renderItem={renderRecord}
        />
      </View>
    </>
  );
};
