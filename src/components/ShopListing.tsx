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
import { datePrettyPrint } from "../utils/functions";

export const ShopListing = ({ item }: { item: OfferEntry }) => {
  const expiration = new Date(item.expiry);

  return (
    <Pressable onPress={() => console.log("pressed")} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/praygecover.jpg")}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.text_big}>{item.offer.name}</Text>
        <Text style={styles.text_big}>{item.offer.price}$</Text>
        <Text style={styles.text_big}>{item.amount} units</Text>
        <Text style={styles.text_big}>
          Expires on: {datePrettyPrint(expiration)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  imageContainer: {
    padding: 10,
    alignSelf: "center",
  },
  text_big: {
    color: colors.darkMain,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    borderColor: colors.main,
  },
});
