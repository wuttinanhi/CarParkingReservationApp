import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {CarService} from '../libs/car.service';
import {defaultStyles} from '../styles/default.style';

export function SearchLicensePlateInput() {
  const navigate = useNavigation<any>();

  const [licensePlate, setLicensePlate] = React.useState('');

  async function searchCar() {
    try {
      const result = await CarService.searchCarByLicensePlate(licensePlate);
      navigate.navigate('UserProfile', {user: result.car_owner});
      setLicensePlate('');
    } catch (error) {
      return Toast.show({
        type: 'error',
        text1: 'Search car by license plate not found!',
        position: 'top',
      });
    }
  }

  return (
    <View>
      <Text variant="titleLarge">Search car by license plate:</Text>

      <TextInput
        placeholder="Search car by license plate number..."
        mode="outlined"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      <Button mode="contained" style={defaultStyles.mt05} onPress={searchCar}>
        Search
      </Button>
    </View>
  );
}
