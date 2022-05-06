import { Button, Colors, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { User } from '../models/User';
import { colors, config } from '../utils/config';
import { Credentials } from '../models/Credentials';
import { confirmReservation, getUser, login } from '../utils/calls';
import { AuthContext } from '../utils/context';
import React from 'react';
import { WastedButton } from '../components/WastedButton';
import { FooterHeader } from '../templates/FooterHeader';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';

export const ConfirmReservationScreen = ({
  getUserUri,
  loginUri,
  signIn,
  signOut,
  setError,
}) => {
  const [state, setState] = useState<string>('');
  const footer = (
    <View>
      <TextInput
        style={styles.input}
        label={<Text style={styles.input_label}>Code</Text>}
        onChangeText={(input) => setState(input)}
      />
      <WastedButton
        onPress={async () => {
          await confirmReservation(state)
            .then((reservation) => {
              Alert.alert('Items were given away successfully');
            })
            .catch((e: AxiosError<ErrorResponse>) => setError(e.response.data));
        }}
        text="Confirm"
      />
    </View>
  );
  return (
    <FooterHeader
      headerComponent={<></>}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={4}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    width: 200,
    alignSelf: 'center',
  },
  input_label: {
    color: colors.darkerMain,
  },
});
