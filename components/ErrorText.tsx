import React from 'react';
import {Text} from 'react-native';
import {BaseBadRequestError} from '../libs/base.service';
import {defaultStyles} from '../styles/default.style';

interface IErrorTextProps<T = any> {
  errObj: any;
  keyName: keyof T;
}

export function createErrorRender(err: any) {
  if (!err) {
    return null;
  }

  if (err instanceof Error) {
    return <ErrorTextRed message={err.message} />;
  }
}

export function createErrorText<T>(errObj: T, keyName: keyof T) {
  if (errObj) {
    if (errObj instanceof BaseBadRequestError) {
      const record = errObj.getErrorRecord();
      return <ErrorText errObj={record} keyName={keyName} />;
    }

    if (errObj instanceof Error) {
      return <ErrorText errObj={errObj} keyName={keyName} />;
    }
  }
  return null;
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
