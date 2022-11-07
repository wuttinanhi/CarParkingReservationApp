import * as React from 'react';
import {Modal, Portal, Provider} from 'react-native-paper';

export interface IModalWrapperProps {
  show: boolean;
  onDissmiss?: () => void;
  children?: React.ReactNode;
  modalContent?: React.ReactNode;
  dismissable?: boolean;
}

export const ModalWrapper = ({
  show: visible,
  children,
  onDissmiss,
  modalContent,
  dismissable,
}: IModalWrapperProps) => {
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20};

  return (
    <Provider>
      <Portal>
        <Modal
          dismissable={dismissable}
          visible={visible}
          onDismiss={onDissmiss}
          contentContainerStyle={containerStyle}>
          {modalContent}
        </Modal>
      </Portal>
      {children}
    </Provider>
  );
};
