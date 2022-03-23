import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  View,
  Image,
} from "react-native";
import { OfferEntry } from "../models/OfferEntry";
import { colors } from "../utils/config";

export const ShopListing = ({ item }: { item: OfferEntry }) => {
  const expiration = new Date(item.expiry);
  const numberPrettyPrint = (number: number) => {
    if (number < 10) return `0${number}`;

    return number.toString();
  };
  const expirationPrettyPrint = `${expiration.getFullYear()}-${numberPrettyPrint(
    expiration.getMonth()
  )}-${numberPrettyPrint(expiration.getDay())}`;

  return (
    <Pressable onPress={() => console.log("pressed")} style={styles.container}>
      <Image
        source={require("../../assets/praygecover.jpg")}
        style={{ width: 50, height: 50, borderRadius: 30 }}
      />
      <View>
        <Text style={styles.text_big}>{item.offer.name}</Text>
        <Text style={styles.text_big}>{item.offer.price / 100}$</Text>
        <Text style={styles.text_big}>{item.amount} units</Text>
      </View>
      <View>
        <Text style={styles.text_big}>Expires on: {expirationPrettyPrint}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text_big: {
    color: colors.darkMain,
  },
});
