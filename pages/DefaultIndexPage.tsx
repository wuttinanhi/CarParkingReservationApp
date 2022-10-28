import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from 'react-native-paper';

import BottomNavbar from '../components/BottomNavbar';
import {LoginPage} from '../pages/LoginPage';

const styles = StyleSheet.create({
  bgOrange: {backgroundColor: 'orange'},
});

export function DefaultIndexPage({navigation}: {navigation: any}) {
  return (
    <>
      <LoginPage />
      <View style={styles.bgOrange}>
        <Text>Test</Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Login Page
        </Button>

        <Button mode="contained" onPress={() => {}}>
          DEV
        </Button>
      </View>
      <BottomNavbar />
    </>
  );
}
