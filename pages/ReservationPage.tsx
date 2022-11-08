import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {HeaderBanner} from '../components/HeaderBanner';
import {ReservationRecord} from '../components/ReservationRecord';
import {
  IReservationRecord,
  ReservationService,
} from '../libs/reservation.service';
import {defaultStyles} from '../styles/default.style';

export const ReservationPage = () => {
  const navigation = useNavigation<any>();

  const [reservationData, setReservationData] = React.useState<
    IReservationRecord[]
  >([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hideLoadButton, setHideLoadButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function loadData() {
    const result = await ReservationService.listReservation({
      limit: 10,
      order_by: 'id',
      page: currentPage,
      sort: 1,
    });
    if (result.length === 0) {
      setHideLoadButton(true);
    }
    return result;
  }

  async function onLoadMorePress() {
    setLoading(true);
    const result = await loadData();
    setReservationData(v => [...v, ...result]);
    setCurrentPage(v => v + 1);
    setLoading(false);
  }

  async function reloadData() {
    setCurrentPage(1);
    const result = await loadData();
    setReservationData(result);
    setHideLoadButton(false);
    loadData();
  }

  function renderReservationData() {
    return reservationData.map((v, i) => (
      <ReservationRecord key={i} data={v} reloadHandler={reloadData} />
    ));
  }

  function goToCreateReservationPage() {
    navigation.navigate('CreateReservationPage');
  }

  React.useEffect(() => {
    onLoadMorePress();

    const reloadInterval = setInterval(() => {
      reloadData();
    }, 5000);

    return () => {
      setReservationData([]);
      setCurrentPage(1);
      setHideLoadButton(false);
      setLoading(false);
      clearInterval(reloadInterval);
    };
  }, []);

  if (!reservationData) {
    return null;
  }

  return (
    <>
      <View style={defaultStyles.main}>
        <HeaderBanner headerText="Reservation" />
        <Button
          mode="contained"
          style={defaultStyles.mb05}
          onPress={goToCreateReservationPage}>
          Create Reservation
        </Button>
        <ScrollView>
          {renderReservationData()}
          {!hideLoadButton && (
            <Button
              mode="contained"
              onPress={onLoadMorePress}
              disabled={loading}
              style={defaultStyles.mt10}>
              Load more
            </Button>
          )}
        </ScrollView>
      </View>
    </>
  );
};
