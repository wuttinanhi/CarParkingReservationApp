/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {io, Socket} from 'socket.io-client';
import {ChatBubble} from '../components/ChatBubble';
import {AuthService} from '../libs/auth.service';
import {BaseService} from '../libs/base.service';
import {ChatService, IChatHeadRecord, IChatRecord} from '../libs/chat.service';

export interface IChatPageProps {
  chatHeadRecord: IChatHeadRecord;
}

export const ChatPage = () => {
  const route = useRoute<any>();
  const scrollViewRef = React.useRef<any>();

  const navigation = useNavigation<any>();

  const [chatHistory, setChatHistory] = React.useState<IChatRecord[]>();
  const [chatInput, setChatInput] = React.useState('');

  const [socketHandler, setSocketHandler] = React.useState<Socket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  function loginChat() {
    return new Promise<void>(async resolve => {
      if (!socketHandler) {
        return;
      }

      socketHandler.emit(
        'login',
        {jwt_token: await AuthService.getAccessToken()},
        () => {
          console.log('Logged in!');
          setIsLogin(true);
          resolve();
        },
      );
    });
  }

  async function sendChat() {
    if (!socketHandler) {
      return;
    }

    socketHandler.emit(
      'chat_send',
      {
        jwt_token: await AuthService.getAccessToken(),
        to_user: route.params.chatHeadRecord.chat_head_target_user_id,
        message: chatInput,
      },
      (response: any) => {
        console.log('chat_send', response);
      },
    );

    setChatInput('');
  }

  async function loadChat() {
    if (!socketHandler) {
      return;
    }

    console.log('Loading chat...');

    const response = await ChatService.listChatHistory({
      order_by: 'id',
      page: 1,
      limit: 30,
      sort: 0,
      to_user_id: route.params.chatHeadRecord.chat_head_target_user_id,
    });

    setChatHistory(response);

    console.log('Chat loaded!');

    // const reqData = {
    //   jwt_token: await AuthService.getAccessToken(),
    //   order_by: 'id',
    //   page: 1,
    //   limit: 30,
    //   sort: 1,
    //   to_user: 3,
    // };

    // socketHandler.emit('chat_list', reqData, (response: any) => {
    //   if (!response) {
    //     return console.log('chat_list return null!');
    //   }
    //   setChatHistory(response);
    //   console.log('Chat loaded!');
    // });
  }

  // on loaded
  React.useEffect(() => {
    console.log('Connecting...');

    const socket = io(BaseService.getApiUrl(), {
      timeout: 1000,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      setIsConnected(true);
      setSocketHandler(socket);
      console.log('connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('disconnect');
    });

    socket.on('exception', data => {
      console.log(data);
    });

    socket.on('chat_receive', (data: IChatRecord) => {
      console.log(data);
      setChatHistory((old: any) => [...old, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('exception');

      setIsConnected(false);
      setSocketHandler(null);
      setIsLogin(false);

      socket.disconnect();
      console.log('Removed listener');
    };
  }, []);

  // on socket ready
  React.useEffect(() => {
    if (!isConnected || !socketHandler) {
      return;
    }
    loginChat();
  }, [isConnected, socketHandler]);

  // on socket login
  React.useEffect(() => {
    if (!isLogin) {
      return;
    }

    setChatHistory([]);
    loadChat();
  }, [isLogin]);

  // on chat history change
  React.useEffect(() => {
    setTimeout(() => {
      scrollChatBoxToEnd();
    }, 100);
  }, [chatHistory]);

  function onBackPress() {
    navigation.goBack();
  }

  function scrollChatBoxToEnd() {
    if (!scrollViewRef.current) {
      return;
    }
    scrollViewRef.current.scrollToEnd({animated: true});
  }

  function renderChatBubble() {
    const result: any = [];

    if (!chatHistory) {
      return result;
    }

    for (const record of chatHistory) {
      result.push(
        <ChatBubble
          key={record.chat_id}
          left={record.chat_from_user_id !== 2}
          text={record.chat_message}
        />,
      );
    }

    return result;
  }

  function onChatSendPress() {
    sendChat();
  }

  if (!route) {
    return null;
  }

  return (
    <>
      <KeyboardAvoidingView style={{height: '100%'}}>
        <View style={{flex: 9}}>
          <View>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => onBackPress()} />
              <Appbar.Content
                title={
                  route
                    ? route?.params?.chatHeadRecord?.chat_head_target_user
                        ?.user_username
                    : null
                }
                style={style.titleStyle}
                titleStyle={style.titleStyleInner}
              />
            </Appbar.Header>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={{
              paddingVertical: '0%',
              height: '100%',
              paddingHorizontal: '5%',
              marginBottom: '2%',
            }}>
            {renderChatBubble()}
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'white',
          }}>
          <TextInput
            value={chatInput}
            style={style.chatInput}
            blurOnSubmit={false}
            onChangeText={text => setChatInput(text)}
            onSubmitEditing={() => {}}
          />

          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Button mode="contained" onPress={onChatSendPress}>
              Send
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const style = StyleSheet.create({
  fullHeight: {height: '100%'},
  height80: {height: '80%'},
  height20: {height: 'fit', borderWidth: 1},

  titleStyle: {
    marginLeft: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  titleStyleInner: {alignSelf: 'center'},

  chatInput: {
    flex: 6,
    padding: '0%',
    paddingHorizontal: '5%',
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'white',
  },
});
