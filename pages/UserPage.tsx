import React, {useState} from 'react';
import {View} from 'react-native';
import {GoToInvoicePageButton} from '../components/GoToInvoiceButton';
import {HeaderBanner} from '../components/HeaderBanner';
import {LogoutButton} from '../components/LogoutButton';
import {AuthService, IUserFull} from '../libs/auth.service';
import {defaultStyles} from '../styles/default.style';

export const UserPage = () => {
  const [userData, setUserData] = useState<IUserFull | null>(null);

  async function load() {
    const res = await AuthService.getUser();
    setUserData(res);
  }

  React.useEffect(() => {
    load();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <>
      <View style={defaultStyles.main}>
        <HeaderBanner headerText={`Welcome, ${userData.user_firstname}`} />

        <View style={defaultStyles.mt05}>
          <GoToInvoicePageButton />
        </View>
        <View style={defaultStyles.mt05}>
          <LogoutButton />
        </View>
      </View>
    </>
  );
};
