import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Toast from 'react-native-toast-message';
import {createErrorText} from '../components/ErrorText';
import {HeaderBanner} from '../components/HeaderBanner';
import {CarService, ICarRecord} from '../libs/car.service';
import {
  IParkingLotAvailable,
  ParkingLotService,
} from '../libs/parking-lot.service';
import {
  ReservationBadRequest,
  ReservationError,
  ReservationService,
} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export const CreateReservationPage = () => {
  const navigation = useNavigation<any>();

  const [carList, setCarList] = useState<ICarRecord[]>([]);
  const [showCarDropDown, setShowCarDropDown] = useState(false);

  const [parkingLotList, setParkingLotList] = useState<IParkingLotAvailable[]>(
    [],
  );
  const [showParkingLotDropDown, setShowParkingLotDropDown] = useState(false);

  const [carId, setCarId] = useState(0);
  const [parkingLotId, setParkingLotId] = useState(0);

  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);

  const [errorObject, setErrorObject] = useState<any>(null);

  async function doCreateReservation() {
    try {
      setCreateButtonDisabled(true);

      await ReservationService.createReservation({
        car_id: carId,
        parking_lot_id: parkingLotId,
      });

      navigation.navigate('ReservationPage');
    } catch (error) {
      if (error instanceof ReservationBadRequest) {
        const errObj = error.getErrorRecord();
        setErrorObject(errObj);

        return Toast.show({
          type: 'error',
          text1: error.message,
          position: 'bottom',
        });
      }

      if (error instanceof ReservationError) {
        return Toast.show({
          type: 'error',
          text1: error.message,
          position: 'bottom',
        });
      }
    } finally {
      setCreateButtonDisabled(false);
    }
  }

  async function loadData() {
    const carListResult = await CarService.listCar({
      limit: 10,
      order_by: 'id',
      page: 1,
      sort: 0,
    });

    const parkingLotListResult = await ParkingLotService.listParkingLot();

    setCarList(carListResult);
    setParkingLotList(parkingLotListResult.filter(v => v.available));
  }

  useEffect(() => {
    loadData();
  }, []);

  if (!carList && !parkingLotList) {
    return null;
  }

  return (
    <View style={defaultStyles.main}>
      <HeaderBanner headerText="Create Reservation" />

      <View style={defaultStyles.formBody}>
        <View style={defaultStyles.mb10}>
          <Text variant="titleMedium">Car:</Text>
          <DropDown
            label="Car"
            mode="outlined"
            visible={showCarDropDown}
            showDropDown={() => setShowCarDropDown(true)}
            onDismiss={() => setShowCarDropDown(false)}
            value={carId}
            setValue={v => setCarId(v)}
            list={carList.map(v => ({
              label: `${v.car_type} (${v.car_license_plate})`,
              value: v.car_id,
            }))}
          />
          {createErrorText(errorObject, 'car_id')}
        </View>

        <View style={defaultStyles.mb10}>
          <Text variant="titleMedium">Parking Lot:</Text>
          <DropDown
            label="Parking Lot"
            mode="outlined"
            visible={showParkingLotDropDown}
            showDropDown={() => setShowParkingLotDropDown(true)}
            onDismiss={() => setShowParkingLotDropDown(false)}
            value={parkingLotId}
            setValue={v => setParkingLotId(v)}
            list={parkingLotList.map(v => ({
              label: `${v.location}`,
              value: v.id,
            }))}
          />
          {createErrorText(errorObject, 'parking_lot_id')}
        </View>

        <View style={defaultStyles.mb10}>
          <Button
            mode="contained"
            onPress={doCreateReservation}
            disabled={createButtonDisabled}
            style={defaultStyles.formSpace}>
            Create Reservation
          </Button>
        </View>
      </View>
    </View>
  );
};

// <TextInput
//   label="Car Id"
//   mode="outlined"
//   value={`${carId}`}
//   style={defaultStyles.formSpace}
// />
// {createErrorText(errorObject, 'car_id')}

// <TextInput
//   label="Parking Lot Id"
//   mode="outlined"
//   value={`${parkingLotId}`}
//   style={defaultStyles.formSpace}
// />
// {createErrorText(errorObject, 'parking_lot_id')}
