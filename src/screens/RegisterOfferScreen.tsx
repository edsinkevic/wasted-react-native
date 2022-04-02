import { clone } from "cloneable-ts";
import React, { useContext, useReducer, useState } from "react";
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

export const RegisterOfferScreen = ({ navigation }) => {
  const { member, setError } = useContext(AuthContext);

  const [info, setInfo] = useState<Info>({
    name: "",
    addedBy: member.vendor.id,
    weight: 0,
    category: "",
    price: 0,
  });

  const initialInput = {
    price: "",
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

  const header = <Text style={styles.title}>Register an offer</Text>;
  const footer = (
    <View style={styles.container}>
      <TextInput
        {...inputProps("Item name")}
        maxLength={30}
        onChangeText={(input) => setInfo(clone(info, { name: input }))}
      />
      <TextInput
        {...inputProps("Category")}
        maxLength={12}
        onChangeText={(input) => setInfo(clone(info, { category: input }))}
      />
      <TextInput
        {...inputProps("Weight")}
        value={textInput.weight}
        error={textInput.weight === "0"}
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
          registerOffer(info)
            .then((result) => navigation.jumpTo("Register entries"))
            .catch((e) => setError(e))
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
