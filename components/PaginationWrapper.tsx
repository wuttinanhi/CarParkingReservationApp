import React from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {defaultStyles} from '../styles/default.style';

export interface PaginationWrapperProps {
  loadFunction: (page: number) => Promise<any>;
  renderItem: (item: any, index: number) => JSX.Element;
}

export function PaginationWrapper<T>({
  loadFunction,
  renderItem,
}: PaginationWrapperProps) {
  const [reservationData, setReservationData] = React.useState<T[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hideLoadButton, setHideLoadButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function load() {
    setLoading(true);
    const result = await loadFunction(currentPage);
    if (result.length === 0) {
      setHideLoadButton(true);
    }
    setReservationData(v => [...v, ...result]);
    setCurrentPage(v => v + 1);
    setLoading(false);
  }

  function renderReservationData() {
    return reservationData.map((v, i) => renderItem(v, i));
  }

  React.useEffect(() => {
    load();
    return () => {
      setReservationData([]);
      setCurrentPage(1);
      setHideLoadButton(false);
      setLoading(false);
    };
  }, []);

  if (!reservationData) {
    return null;
  }

  return (
    <ScrollView>
      {renderReservationData()}
      {!hideLoadButton && (
        <Button
          mode="contained"
          onPress={load}
          disabled={loading}
          style={defaultStyles.mt10}>
          Load more
        </Button>
      )}
    </ScrollView>
  );
}
