/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Avatar, Button, Card} from 'react-native-paper';
import {IReservationRecord} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export interface IReservationCardProps {
  reservation: IReservationRecord;
}

export const ReservationRecord = (props: IReservationCardProps) => {
  // const navigation = useNavigation<any>();

  return (
    <Card style={defaultStyles.mt05}>
      <Card.Title
        title={`     ${props.reservation.car.car_type} (${props.reservation.car.car_license_plate})`}
        subtitle={`     ${props.reservation.parking_lot.parking_lot_location}`}
        left={() => <Avatar.Icon {...props} icon="ticket" />}
      />
      <Card>
        <Card.Actions>
          <Button mode="contained">End Reservation</Button>
        </Card.Actions>
      </Card>
    </Card>
  );
};
