/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';

import BottomNavbar from './components/BottomNavbar';

const App = () => {
  return (
    <PaperProvider>
      <View style={styles.bgOrange}>
        <Text>Test</Text>
      </View>

      <BottomNavbar />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  bgOrange: {backgroundColor: 'orange'},
});

export default App;
