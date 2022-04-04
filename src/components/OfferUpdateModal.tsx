import { clone } from 'cloneable-ts';
import React, { useContext, useReducer, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { colors, config } from '../utils/config';
import { AuthContext } from '../utils/context';
import CurrencyInput, { FakeCurrencyInput } from 'react-native-currency-input';
import { FooterHeader } from '../templates/FooterHeader';
import ExpiryDatePicker from './ExpiryDatePicker';
import { registerOffer, updateOffer } from '../utils/calls';
import { Offer } from '../models/Offer';
import { OfferUpdate } from '../models/OfferUpdate';
import { Axios, AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';

export const OfferInputModal = ({
  offer,
  onSuccess,
}: {
  offer: Offer;
  onSuccess: (offer: Offer) => void;
}) => {
  const { member, setError } = useContext(AuthContext);

  const [info, setInfo] = useState<OfferUpdate>({
    offerId: offer.id,
    name: offer.name,
    weight: offer.weight,
    category: offer.category,
    price: offer.price,
  });

  const initialInput = {
    price: '',
  };

  const reducer = (state, updates) => ({
    ...state,
    ...updates,
  });

  const [textInput, updateInput] = useReducer(reducer, initialInput);

  const inputProps = (labelString: string) => ({
    underlineColor: colors.main,
    activeUnderlineColor: colors.main,
    style: styles.textInput,
    label: <Text style={styles.input_label}>{labelString}</Text>,
  });

  return (
    <View style={styles.container}>
      <TextInput
        {...inputProps('Item name')}
        maxLength={30}
        defaultValue={info.name}
        onChangeText={(input) => setInfo(clone(info, { name: input }))}
      />
      <TextInput
        {...inputProps('Category')}
        maxLength={12}
        defaultValue={info.category}
        onChangeText={(input) => setInfo(clone(info, { category: input }))}
      />
      <TextInput
        {...inputProps('Weight')}
        value={textInput.weight}
        defaultValue={info.weight.toString()}
        error={textInput.weight === '0'}
        maxLength={3}
        keyboardType="numeric"
        onChangeText={(input: string) => {
          updateInput({ weight: input });
          setInfo(clone(info, { weight: Number.parseInt(input) }));
        }}
      />
      <FakeCurrencyInput
        style={{ borderWidth: 1 }}
        value={info.price}
        prefix="€"
        onChangeValue={(value) => setInfo(clone(info, { price: value }))}
        onChangeText={(text) => updateInput({ price: text })}
      />
      <Button
        onPress={() =>
          updateOffer(info)
            .then((result: Offer) => onSuccess(result))
            .catch((e: AxiosError<ErrorResponse>) => setError(e.response.data))
        }
      >
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label_text: {
    color: colors.darkerMain,
  },
  title: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: colors.secondary,
    width: 350,
    alignSelf: 'center',
  },
  input_label: {
    color: colors.darkerMain,
  },
});
