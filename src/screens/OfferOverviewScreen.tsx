import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { OfferInputModal } from '../components/OfferUpdateModal';
import { Offer } from '../models/Offer';
import { RegisterOfferScreen } from './RegisterOfferScreen';

export default ({
  visible,
  setVisible,
  offer,
  onSuccess,
  onDelete,
}: {
  visible: boolean;
  setVisible: (x: boolean) => void;
  offer: Offer;
  onSuccess: (x: Offer) => void;
  onDelete: (x: Offer) => void;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <OfferInputModal
            offer={offer}
            onUpdate={onSuccess}
            onDelete={onDelete}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
