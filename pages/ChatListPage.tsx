import React from 'react';
import {View} from 'react-native';
import {ChatHeadRecord} from '../components/ChatRecord';
import {HeaderBanner} from '../components/HeaderBanner';
import {ChatService, IChatHeadRecord} from '../libs/chat.service';
import {defaultStyles} from '../styles/default.style';

export const ChatListPage = () => {
  const [dataList, setDataList] = React.useState<IChatHeadRecord[]>();

  async function fetchChatList() {
    const list = await ChatService.listChatHead({
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
      return (
        <ChatHeadRecord chatHeadRecord={record} key={record.chat_head_id} />
      );
    });
  }

  React.useEffect(() => {
    fetchChatList();
  }, []);

  return (
    <View style={defaultStyles.main}>
      <HeaderBanner headerText="Chat" />
      <View>{renderChatList()}</View>
    </View>
  );
};
