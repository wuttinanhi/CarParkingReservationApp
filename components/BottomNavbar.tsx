import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {CarPage} from '../pages/CarPage';
import {ChatListPage} from '../pages/ChatListPage';
import {ReservationPage} from '../pages/ReservationPage';
import {UserPage} from '../pages/UserPage';

const ReservationRoute = () => <ReservationPage />;
const CarRoute = () => <CarPage />;
const ChatRoute = () => <ChatListPage />;
const UserRoute = () => <UserPage />;

const BottomNavbar = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'Reservation',
      title: 'Reservation',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'Car',
      title: 'Car',
      focusedIcon: 'car',
      unfocusedIcon: 'car',
    },
    {
      key: 'Chat',
      title: 'Chat',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
    },
    {
      key: 'User',
      title: 'User',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Reservation: ReservationRoute,
    Car: CarRoute,
    Chat: ChatRoute,
    User: UserRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavbar;
