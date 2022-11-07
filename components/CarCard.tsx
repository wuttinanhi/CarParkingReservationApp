import React from 'react';
import {Avatar, Button, Card} from 'react-native-paper';
import {CarService, ICarRecord} from '../libs/car.service';
import {defaultStyles} from '../styles/default.style';

export interface ICarCardProps {
  car: ICarRecord;
  onEditPress?: (data: ICarRecord) => void;
  reloadHandler?: () => void;
}

export const CarCard = ({car, onEditPress, reloadHandler}: ICarCardProps) => {
  async function onCarDeletePress() {
    await CarService.removeCar(car.car_id);
    if (reloadHandler) {
      reloadHandler();
    }
  }

  return (
    <Card style={defaultStyles.mt05}>
      <Card.Title
        title={`     ${car.car_type}`}
        subtitle={`     ${car.car_license_plate}`}
        left={() => <Avatar.Icon icon="car" />}
      />
      <Card>
        <Card.Actions>
          <Button mode="outlined" onPress={onCarDeletePress}>
            Delete
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              if (onEditPress) {
                onEditPress(car);
              }
            }}>
            Edit Car Info
          </Button>
        </Card.Actions>
      </Card>
    </Card>
  );
};
