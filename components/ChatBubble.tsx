/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export interface IChatBubbleProps {
  left: boolean;
  text: string;
}

export const ChatBubble = ({left, text}: IChatBubbleProps) => {
  return (
    <View
      style={{
        width: '50%',
        marginVertical: '2%',
        marginLeft: left ? '1%' : 'auto',
      }}>
      <Card>
        <Card.Content>
          <Text>{text}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};
