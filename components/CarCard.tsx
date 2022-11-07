import React from 'react';
import {Avatar, Button, Card} from 'react-native-paper';
import {ICarRecord} from '../libs/car.service';
import {defaultStyles} from '../styles/default.style';

export interface ICarCardProps {
  car: ICarRecord;
}

export const CarCard = ({car}: ICarCardProps) => {
  function onEditCarButtonPress() {
    // TODO: Implement this
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
          <Button mode="contained" onPress={onEditCarButtonPress}>
            Edit Car Info
          </Button>
        </Card.Actions>
      </Card>
    </Card>
  );
};
