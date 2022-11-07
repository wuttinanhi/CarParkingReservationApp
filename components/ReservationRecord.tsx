/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {DifferenceHourBetweenDates, fromStringToDate} from '../libs/etc';
import {IReservationRecord} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export interface IReservationCardProps {
  reservation: IReservationRecord;
}

export const ReservationRecord = (props: IReservationCardProps) => {
  function renderTextElapseTime() {
    const {reservation} = props;
    const start = fromStringToDate(
      reservation.reservation.reservation_start_time,
    );
    const end = fromStringToDate(reservation.reservation.reservation_end_time);
    const diff = DifferenceHourBetweenDates(start, end);
    return `Parked ${diff} ${diff > 1 ? 'hours' : 'hour'}`;
  }

  function renderEndReservationButton() {
    return (
      <Button
        mode="contained"
        disabled={props.reservation.reservation.reservation_end_time != null}>
        End Reservation
      </Button>
    );
  }

  return (
    <Card style={defaultStyles.mt05}>
      <Card.Title
        title={`     #${props.reservation.reservation.reservation_id} ${props.reservation.car.car_type} (${props.reservation.car.car_license_plate})`}
        subtitle={`     ${props.reservation.parking_lot.parking_lot_location}`}
        left={() => <Avatar.Icon {...props} icon="ticket" />}
      />
      <Card>
        <Card.Actions>
          <Text>{renderTextElapseTime()}</Text>
          {renderEndReservationButton()}
        </Card.Actions>
      </Card>
    </Card>
  );
};
