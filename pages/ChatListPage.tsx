import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {ChatRecord} from '../components/ChatRecord';
import {ChatService, IChatHeadRecord} from '../libs/chat.service';
import {defaultStyles} from '../styles/default.style';

export const ChatListPage = () => {
  const [dataList, setDataList] = React.useState<IChatHeadRecord[]>();

  async function fetchChatList() {
    const list = await ChatService.listChat({
      limit: 10,
      order_by: 'chathead_last_update_date',
      page: 1,
      sort: 1,
    });

    setDataList(list);
  }

  function renderChatList() {
    if (!dataList) {
      return;
    }
    return dataList.map(record => {
      return <ChatRecord chatHeadRecord={record} key={record.chat_head_id} />;
    });
  }

  React.useEffect(() => {
    fetchChatList();
  }, []);

  return (
    <View style={defaultStyles.main}>
      <Text variant="displayMedium" style={defaultStyles.mt10}>
        Chat
      </Text>
      <View style={defaultStyles.mt10}>{renderChatList()}</View>
    </View>
  );
};