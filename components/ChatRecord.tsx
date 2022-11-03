import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Avatar, Card} from 'react-native-paper';
import {IChatHeadRecord} from '../libs/chat.service';
import {defaultStyles} from '../styles/default.style';

export interface IChatRecordProps {
  chatHeadRecord: IChatHeadRecord;
}

export const ChatHeadRecord = (props: IChatRecordProps) => {
  const navigation = useNavigation<any>();

  function gotoChatPage() {
    navigation.navigate('ChatPage', {
      chatHeadRecord: props.chatHeadRecord,
    });
  }

  return (
    <Card style={defaultStyles.mt05} onPress={gotoChatPage}>
      <Card.Title
        title={`    ${props.chatHeadRecord.chat_head_target_user.user_username}`}
        subtitle={`     ${props.chatHeadRecord.chat_head_last_update_date}`}
        left={() => <Avatar.Icon {...props} icon="message" />}
        titleVariant="titleLarge"
      />
    </Card>
  );
};
