import React from 'react';
import {Text} from 'react-native';
import {defaultStyles} from '../styles/default.style';

interface IErrorTextProps<T = any> {
  errObj: any;
  keyName: keyof T;
}

export function createErrorText<T>(errObj: T, keyName: keyof T) {
  return <ErrorText errObj={errObj} keyName={keyName} />;
}

export const ErrorText = ({errObj, keyName}: IErrorTextProps) => {
  if (errObj && errObj[keyName]) {
    const errorMessageValue = errObj[keyName];
    return <Text style={defaultStyles.redText}>{errorMessageValue}</Text>;
  }
  return null;
};

export interface IErrorRedTextProps {
  message: string;
}

export const ErrorTextRed = ({message}: IErrorRedTextProps) => {
  return <Text style={defaultStyles.redText}>{message}</Text>;
};
