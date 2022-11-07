import * as React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

export interface IFloatingButtonProps {
  onPress: () => void;
}

export function FloatingButton({onPress}: IFloatingButtonProps) {
  return <FAB icon="plus" style={styles.fab} onPress={() => onPress()} />;
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
