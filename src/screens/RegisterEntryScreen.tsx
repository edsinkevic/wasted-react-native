import { clone } from "cloneable-ts";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { colors, config } from "../utils/config";
import { AuthContext } from "../utils/context";
import CurrencyInput, { FakeCurrencyInput } from "react-native-currency-input";
import { FooterHeader } from "../templates/FooterHeader";
import ExpiryDatePicker from "../components/ExpiryDatePicker";
import {
  getOffersByVendorName,
  registerEntry,
  registerOffer,
} from "../utils/calls";
import DatePicker from "react-native-date-picker";
import { datePrettyPrint } from "../utils/functions";
import { Offer } from "../models/Offer";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { TouchableOpacity } from "react-native-gesture-handler";
import OfferListing from "../components/OfferListing";

interface Info {
  offerId: string;
  expiry: Date;
  amount: number;
}

export const RegisterEntryScreen = ({ navigation }) => {
  const { member, setError } = useContext(AuthContext);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [offers, setOffers] = useState<Array<Offer>>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  const [info, setInfo] = useState<Info>({
    offerId: "",
    expiry: new Date(),
    amount: 0,
  });

  const [date, setDate] = useState("");
  const [inputError, setInputError] = useState(false);

  const renderOffer = ({ item }) => (
    <OfferListing
      item={item}
      onPress={() => setInfo(clone(info, { offerId: item.id }))}
    />
  );

  useEffect(() => {
    setRefresh(true);
    getOffersByVendorName(member.vendor.name)
      .then((offers) => {
        console.log(offers);
        setOffers(offers);
      })
      .catch((e) => setError(e))
      .finally(() => setRefresh(false));
  }, []);

  useEffect(() => {
    console.log(date);
    if (date != "") setInfo(clone(info, { expiry: new Date(date) }));
  }, [date]);

  const inputProps = (labelString: string) => ({
    underlineColor: colors.main,
    activeUnderlineColor: colors.main,
    style: styles.textInput,
    label: <Text style={styles.input_label}>{labelString}</Text>,
  });

  const header = <Text style={styles.title}>Register an offer entry</Text>;
  const footer = (
    <View style={styles.container}>
      <TextInput
        {...inputProps("Amount")}
        error={inputError}
        keyboardType="numeric"
        maxLength={3}
        onChangeText={(input: string) => {
          if (input === "0") setInputError(true);
          else setInputError(false);
          setInfo(clone(info, { amount: Number.parseInt(input) }));
        }}
      />
      {pickerOpen ? (
        <ExpiryDatePicker
          selectedDate={info.expiry}
          setSelectedDate={setDate}
          setOpen={setPickerOpen}
        />
      ) : (
        <Button onPress={() => setPickerOpen(true)}>
          {date.length == 0
            ? "Select expiry date"
            : datePrettyPrint(info.expiry)}
        </Button>
      )}

      <FlatList
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          getOffersByVendorName(member.vendor.name)
            .then(setOffers)
            .catch(setError)
            .finally(() => setRefresh(false));
        }}
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
      />

      <Button
        onPress={() =>
          registerEntry(clone(info, { expiry: info.expiry }))
            .then((result) => navigation.jumpTo("Shop"))
            .catch(setError)
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
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: colors.secondary,
    width: 350,
    alignSelf: "center",
  },
  currencyInput: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input_label: {
    color: colors.darkerMain,
  },
});
