import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Offer } from "../models/Offer";
import { colors } from "../utils/config";

export default ({ item, onPress }: { item: Offer; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View>
      <Text style={styles.text}>Name: {item.name}</Text>
      <Text style={styles.text}>Price: {item.price}€</Text>
      <Text style={styles.text}>Weight: {item.weight}g</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 10,
    padding: 10,
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
  text: {
    color: colors.darkerMain,
  },
});
