import { clone } from 'cloneable-ts';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { colors, config } from '../utils/config';
import { AuthContext } from '../utils/context';
import CurrencyInput, { FakeCurrencyInput } from 'react-native-currency-input';
import { FooterHeader } from '../templates/FooterHeader';
import ExpiryDatePicker from '../components/ExpiryDatePicker';
import { getCategories, registerOffer } from '../utils/calls';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Picker } from '@react-native-picker/picker';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import * as IO from 'fp-ts/lib/IO';
import { Member } from '../models/Member';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';
import { OfferCreate } from '../models/OfferCreate';

export const RegisterOfferScreen = ({ navigation }) => {
  const {
    member,
    setError,
  }: { member: Member; setError: (x: ErrorResponse) => void } =
    useContext(AuthContext);

  const [info, setInfo] = useState<OfferCreate>({
    name: '',
    addedBy: member.vendor.id,
    weight: 0,
    category: '',
    price: 0,
  });

  const initialInput = {
    price: '',
    category: 'Sweets',
  };

  const reducer = (state, updates) => ({
    ...state,
    ...updates,
  });

  const [categories, setCategories] = useState<Array<string>>([]);

  const [textInput, updateInput] = useReducer(reducer, initialInput);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e: AxiosError<ErrorResponse>) => setError(e.response.data));
  }, []);

  const inputProps = (labelString: string) => ({
    underlineColor: colors.main,
    activeUnderlineColor: colors.main,
    style: styles.textInput,
    label: <Text style={styles.input_label}>{labelString}</Text>,
  });

  const header = <Text style={styles.title}>Register an offer</Text>;
  const footer = (
    <View style={styles.container}>
      <TextInput
        {...inputProps('Item name')}
        maxLength={30}
        onChangeText={(input) => setInfo(clone(info, { name: input }))}
      />
      <Picker
        style={styles.input_label}
        selectedValue={textInput.category}
        onValueChange={(value, itemIndex) => {
          setInfo(clone(info, { category: value }));
          updateInput({ category: value });
        }}
      >
        {categories.map((cat) => (
          <Picker.Item key={Math.random()} label={cat} value={cat} />
        ))}
      </Picker>
      <TextInput
        {...inputProps('Weight')}
        value={textInput.weight}
        error={textInput.weight === '0'}
        maxLength={3}
        keyboardType="numeric"
        onChangeText={(input: string) => {
          updateInput({ weight: input });
          setInfo(clone(info, { weight: Number.parseInt(input) }));
        }}
      />
      <FakeCurrencyInput
        containerStyle={styles.currency}
        style={styles.currency_input}
        value={info.price}
        prefix="€"
        onChangeValue={(value) => setInfo(clone(info, { price: value }))}
        onChangeText={(text) => updateInput({ price: text })}
      />
      <Button
        onPress={() =>
          registerOffer(info)
            .then((result) => navigation.jumpTo('Register entries'))
            .catch((e: AxiosError<ErrorResponse>) => setError(e.response.data))
        }
      >
        Register
      </Button>
    </View>
  );

  return (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={3}
    />
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
  currency: {
    borderWidth: 1,
    width: 300,

    alignSelf: 'center',
    borderColor: colors.main,
    borderRadius: 30,
  },
  currency_input: {
    color: colors.darkerMain,
    alignSelf: 'center',
  },
});
