/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View} from 'react-native';
import {Button, Card, Text, Title} from 'react-native-paper';
import {IUserFull} from '../libs/auth.service';

export interface UserProfileDisplayProps {
  user: IUserFull;
  onEditPress: () => void;
}

export function UserProfileDisplay({
  user,
  onEditPress,
}: UserProfileDisplayProps) {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>User Profile</Title>

          <Text variant="bodyMedium">ID: #{user.user_id}</Text>
          <Text variant="bodyMedium">
            Name: {user.user_firstname} {user.user_lastname}
          </Text>
          <Text variant="bodyMedium">Email: {user.user_email}</Text>
          <Text variant="bodyMedium">
            Phone Number: {user.user_phone_number}
          </Text>
          <Text variant="bodyMedium">Citizen ID: {user.user_citizen_id}</Text>
        </Card.Content>

        <Card.Actions>
          <Button mode="contained" onPress={onEditPress}>
            Edit Profile
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
