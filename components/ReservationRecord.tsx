import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {DifferenceHourBetweenDates, fromStringToDate} from '../libs/etc';
import {
  IReservationRecord,
  ReservationService,
} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export interface IReservationCardProps {
  data: IReservationRecord;
  reloadHandler?: () => void;
}

export const ReservationRecord = ({
  data,
  reloadHandler,
}: IReservationCardProps) => {
  const navigation = useNavigation<any>();

  async function onReservationEndPress() {
    const result = await ReservationService.endReservation(
      data.reservation.reservation_id,
    );

    if (reloadHandler) {
      reloadHandler();
    }

    if (result.invoice.invoice_charge_amount > 0) {
      navigation.navigate('InvoiceCheckoutPage', {
        invoiceId: result.invoice.invoice_id,
      });
    }
  }

  function renderTextElapseTime() {
    const start = fromStringToDate(data.reservation.reservation_start_time);

    let end;
    if (data.reservation.reservation_end_time) {
      end = fromStringToDate(data.reservation.reservation_end_time);
    } else {
      // end = now date
      end = new Date();
    }

    const diff = DifferenceHourBetweenDates(start, end);
    return `Parked ${diff} ${diff > 1 ? 'hours' : 'hour'}`;
  }

  function renderEndReservationButton() {
    return (
      <Button
        mode="contained"
        disabled={data.reservation.reservation_end_time != null}
        onPress={onReservationEndPress}>
        End Reservation
      </Button>
    );
  }

  return (
    <Card style={defaultStyles.mt05}>
      <Card.Title
        title={`     #${data.reservation.reservation_id} ${data.car.car_type} (${data.car.car_license_plate})`}
        subtitle={`     ${data.parking_lot.parking_lot_location}`}
        left={() => <Avatar.Icon icon="ticket" />}
        titleVariant="titleMedium"
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
