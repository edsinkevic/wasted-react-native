import { clone } from "cloneable-ts";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { colors, config } from "../utils/config";
import { AuthContext } from "../utils/context";
import CurrencyInput, { FakeCurrencyInput } from "react-native-currency-input";
import { FooterHeader } from "../templates/FooterHeader";
import ExpiryDatePicker from "../components/ExpiryDatePicker";
import { registerOffer } from "../utils/calls";

interface Info {
  name: string;
  addedBy: string;
  weight: number;
  category: string;
  price: number;
}

export const RegisterOfferScreen = (navigation) => {
  const { member, setError } = useContext(AuthContext);

  const [info, setInfo] = useState<Info>({
    name: "",
    addedBy: member.vendor.id,
    weight: 0,
    category: "",
    price: 0,
  });

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
        {...inputProps("Item name")}
        onChangeText={(input) => setInfo(clone(info, { name: input }))}
      />
      <TextInput
        {...inputProps("Category")}
        onChangeText={(input) => setInfo(clone(info, { category: input }))}
      />
      <FakeCurrencyInput
        {...inputProps("Weight")}
        value={info.weight}
        precision={0}
        onChangeValue={(input) => setInfo(clone(info, { weight: input }))}
      />
      <FakeCurrencyInput
        {...inputProps("Price")}
        value={info.price}
        prefix="€"
        separator="."
        onChangeValue={(input) => setInfo(clone(info, { price: input }))}
      />
      <Button
        onPress={() =>
          registerOffer(info)
            .then((result) => navigation.jumpTo("Shop"))
            .catch(e => setError(e))
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
  input_label: {
    color: colors.darkerMain,
  },
});
