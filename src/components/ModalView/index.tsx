import React, { ReactNode } from 'react';
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from 'react-native';
//TouchableWithoutFeedback para identificar click do user em qualquer espaço da tela

import { styles } from './styles';

import { Background } from '../Background';


type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
}

export function ModalView({
  children, 
  closeModal,
  ...rest
}: Props){
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}