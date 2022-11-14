import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Linking, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {AppBarWrapper} from '../components/AppBarWrapper';
import {IUserShareable} from '../libs/auth.service';
import {defaultStyles} from '../styles/default.style';

export function UserProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [userDetails, setUserDetails] = React.useState<IUserShareable>();

  React.useEffect(() => {
    if (route.params?.user) {
      setUserDetails(route.params.user);
    }
  }, [route.params.user]);

  if (!userDetails) {
    return null;
  }

  function gotoChatPage() {
    if (!userDetails) {
      return;
    }

    navigation.navigate('ChatPage', {
      chatHeadRecord: {
        chat_head_target_user_id: userDetails.user_id,
        chat_head_target_user: userDetails,
      },
    });
  }

  function callUser() {
    if (!userDetails) {
      return;
    }
    Linking.openURL(`tel:${userDetails.user_phone_number}`);
  }

  return (
    <>
      <AppBarWrapper title="Search Profile" />

      <View style={defaultStyles.main}>
        <View style={defaultStyles.mt50}>
          <Text variant="displaySmall" style={defaultStyles.textCenter}>
            User Profile
          </Text>

          <View style={defaultStyles.mt10}>
            <Text variant="titleLarge" style={defaultStyles.textCenter}>
              {userDetails.user_firstname} {userDetails.user_lastname}
            </Text>
          </View>

          <View style={defaultStyles.mt10}>
            <Button
              mode="contained"
              onPress={gotoChatPage}
              style={defaultStyles.mb05}>
              Chat with this user
            </Button>

            <Button
              mode="contained"
              onPress={callUser}
              style={defaultStyles.mb05}>
              Telephone call
            </Button>
          </View>
        </View>
      </View>
    </>
  );
}
